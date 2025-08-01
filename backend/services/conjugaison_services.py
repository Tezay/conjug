import random as rd
from flask import session, request
from flask_login import current_user

from backend.services.leaderboard_services import add_xp
from backend.models import ConjugaisonRegular, ConjugaisonIrregular, ConjugaisonVerbe

def _session_key(name):
    language = prefix()
    return f"{language}_{name}"

def prefix():
    endpoint = request.endpoint or ""
    prefix = endpoint.split('.')[-1]   # 'it' ou 'es'
    return prefix

def init_active_times(form_data, pronouns_dict, time_keys):
    # Initialise les temps actifs en fonction des données du formulaire
    selected = []
    
    # Vérif les cases à cocher spécifiques pour les temps
    for key, value in form_data.items():
        if key in time_keys:
            if value == 'on' or value == True:
                selected.append(key)

    if not selected:
        selected = time_keys[0]
    
    #print(f"DEBUG: Selected times: {selected}")
    
    session[_session_key("active_times")] = selected
    session[_session_key("current_time")] = rd.choice(selected)
    session[_session_key("current_pronoun")] = rd.choice(list(pronouns_dict.keys()))

def sync_time_checkboxes(time_keys):
    active = set(session.get(_session_key("active_times"), []))
    for t in time_keys:
        session[_session_key(f"checked_{t}")] = (t in active)

def init_verb_type(form_data):
    choice = form_data.get("verb_type")
    if choice  == "regulier":
        choice = "regular"
    elif choice == "irregulier":
        choice = "irregular"
    else:
        choice = "all"
        
    session[_session_key("verb_type")] = choice or session.get(_session_key("verb_type"), "regular")

    session[_session_key("checked_regular")] = (session[_session_key("verb_type")] == "regular")
    session[_session_key("checked_irregular")] = (session[_session_key("verb_type")] == "irregular")
    session[_session_key("checked_all")] = (session[_session_key("verb_type")] == "all")

def handle_user_response(form_data, pronouns_dict, ):
    language = prefix()
    answer = form_data.get("reponse", "").strip().lower().replace(" ", "")
    session[_session_key("user_answer")] = answer

    verb, verb_type = session.get(_session_key("current_verb&current_type"), ("", ""))
    tense = session[_session_key("current_time")]
    pronoun = session[_session_key("current_pronoun")]


    if verb_type == "irregular":
        expected = irregular_expected(tense, pronoun, pronouns_dict, verb, language)
        verify_answer(expected, xp=2)
    else:
        if language == "it":
            it_evaluate_regular(verb, tense, pronoun, pronouns_dict)
        elif language == "es":
            es_evaluate_regular(verb, tense, pronoun, pronouns_dict)


def verify_answer(expected, xp):
    if session[_session_key("user_answer")] == expected:
        session[_session_key("is_correct")] = True
        if current_user.is_authenticated:
            informations = {
                "username": current_user.username,
                "xp": xp,
            }
            add_xp(informations)
    else:
        session[_session_key("is_correct")] = False
        session[_session_key("correct_answer")] = expected
        record_error()

def it_evaluate_regular(verb, tense, pronoun, pronouns_dict):
    verb_group = verb[-3:]  # 'are', 'ere', 'ire'
    stem = verb[:-3]

    # Récup le bon groupe de terminaison
    global_inflection = inflection_ending(tense, pronoun, pronouns_dict, "it", verb_group)

    # Si terminaison pas trouvée
    if global_inflection is None:
        session[_session_key("is_correct")] = False
        session[_session_key("correct_answer")] = "Erreur: Terminaison non trouvée pour ce verbe/temps."
        return

    # Règle orthographique pour les verbes en -care / -gare
    # pour maintenir le son dur 'c' ou 'g' (ex: cerco -> cerchi)
    if verb_group == 'are' and (verb.endswith('care') or verb.endswith('gare')):
        if global_inflection.startswith('e') or global_inflection.startswith('i'):
            stem += 'h'

    correct_full = stem + global_inflection
    verify_answer(correct_full, xp=1)

def es_evaluate_regular(verb, tense, pronoun, pronouns_dict):
    verb_group = verb[-2:]  # 'ar', 'er', 'ir'

    #print(f"DEBUG: Looking for - Language: es, Tense: {tense}, Verb Group: {verb_group}")
    
    # Récup le bon groupe de terminaison
    global_inflection = inflection_ending(tense, pronoun, pronouns_dict, "es", verb_group)

    # Si terminaison pas trouvée
    if global_inflection is None:
        session[_session_key("is_correct")] = False
        session[_session_key("correct_answer")] = "Erreur: Terminaison non trouvée pour ce verbe/temps."
        return

    if tense in ["futur", "conditionnel"]:
        correct_full = verb + global_inflection
    else:
        correct_full = verb[:-2] + global_inflection
    verify_answer(correct_full, xp=1)

def record_error():
    session.setdefault(_session_key("error_times"), []).append(session[_session_key("current_time")])
    session.setdefault(_session_key("error_pronouns"), []).append(session[_session_key("current_pronoun")])
    session.setdefault(_session_key("error_verbs"), []).append(session[_session_key("current_verb&current_type")])

def select_new_verb():
    language = prefix()
    vtype = session.get(_session_key("verb_type"))
    if vtype == "all":
        choice_ir = rd.choice([True, False])
        vtype = "irregular" if choice_ir else "regular"

    verb = verb_choice(vtype, language)

    session[_session_key("current_verb&current_type")] = (verb, vtype)


def apply_error_repetition(pronouns_dict):
    counter = session.get(_session_key("counter"), 0)
    reset_error()
    
    # Vérif si il y a des erreurs à répéter
    error_times = session.get(_session_key("error_times"), [])
    error_pronouns = session.get(_session_key("error_pronouns"), [])
    error_verbs = session.get(_session_key("error_verbs"), [])
    
    # Si erreurs et compteur >= 2 : répète erreur
    if counter >= 2 and error_times and error_pronouns and error_verbs:
        session[_session_key("current_time")] = error_times.pop(0)
        session[_session_key("current_pronoun")] = error_pronouns.pop(0)
        session[_session_key("current_verb&current_type")] = error_verbs.pop(0)
        
        # Update session avec erreurs restantes
        session[_session_key("error_times")] = error_times
        session[_session_key("error_pronouns")] = error_pronouns
        session[_session_key("error_verbs")] = error_verbs
        
        # Réinitialise compteur
        session.pop(_session_key("counter"), None)
        return "Tu as fait une erreur récemment sur ce verbe, conjugue-le à nouveau !"

    # Sinon : sélectionne un nouveau verbe
    session[_session_key("current_time")] = rd.choice(session[_session_key("active_times")])
    session[_session_key("current_pronoun")] = rd.choice(list(pronouns_dict.keys()))
    session[_session_key("counter")] = counter + 1 # if session.get(_session_key("is_correct")) else 0
    return None

def reset_error():
    if session.get(_session_key("error_times")) and len(session[_session_key("error_times")])>= 5:
        session[_session_key("error_times")] = list(session[_session_key("error_times")][-1])
        session[_session_key("error_pronouns")] = list(session[_session_key("error_pronouns")][-1])
        session[_session_key("error_verbs")] = list(session[_session_key("error_verbs")][-1])

def inflection_ending(tense, pronoun, pronouns_dict, language, verb_group):
    #print(f"DEBUG: Querying with - Language: {language}, Tense: {tense}, Verb Group: {verb_group}")
    tense_inflection = ConjugaisonRegular.query.filter_by(language=language, tense=tense, verb_group=verb_group).first()

    name_pronoun = pronouns_dict[pronoun]
    result = getattr(tense_inflection, name_pronoun, None)
    #print(f"DEBUG: Final result for {name_pronoun}: {result}")
    return result

def irregular_expected(tense, pronoun, pronouns_dict, infinitif, language):

    tense_inflection = ConjugaisonIrregular.query.filter_by(language=language, tense=tense, infinitif=infinitif).first()
    name_pronoun = pronouns_dict[pronoun]

    return getattr(tense_inflection, name_pronoun, None)

def verb_choice(verb_type, language):
    verbs = ConjugaisonVerbe.query.filter_by(language=language, verb_type=verb_type).all()

    return rd.choice(verbs).verb

def clear_answer_session():
    session.pop(_session_key("is_correct"), None)
    session.pop(_session_key("correct_answer"), None)
    session.pop(_session_key("user_answer"), "")

