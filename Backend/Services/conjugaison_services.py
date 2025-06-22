import random as rd
from flask import session, request
from flask_login import current_user

from Backend.Services.leaderboard_services import add_xp
from Backend.Models import Conjugaison_regulier, Conjugaison_irregulier, Conjugaison_verbe

def _session_key(name):
    endpoint = request.endpoint or ""
    prefix = endpoint.split('.')[-1]   # 'it' ou 'es'
    return f"{prefix}_{name}"

def set_default():
    session.setdefault(_session_key("current_time"), "temps")
    session.setdefault(_session_key("current_pronoun"), "pronoms")
    session.setdefault(_session_key("current_verb"), "verbe")

def init_active_times(form_data, pronouns_dict):
    selected = form_data.getlist("temps")
    session[_session_key("active_times")] = selected
    session[_session_key("current_time")] = rd.choice(selected)
    session[_session_key("current_pronoun")] = rd.choice(list(pronouns_dict.keys()))

def sync_time_checkboxes(time_keys):
    active = set(session.get(_session_key("active_times"), []))
    for t in time_keys:
        session[_session_key(f"checked_{t}")] = (t in active)

def init_verb_type(form_data):
    choice = form_data.get("verb_type")
    session[_session_key("verb_type")] = choice or session.get(_session_key("verb_type"), "regulier")

    session[_session_key("checked_regulier")] = (session[_session_key("verb_type")] == "regulier")
    session[_session_key("checked_irregulier")] = (session[_session_key("verb_type")] == "irregulier")
    session[_session_key("checked_tous")] = (session[_session_key("verb_type")] == "tous")

def handle_user_response(form_data, pronouns_dict, language):
    answer = form_data.get("reponse", "").strip().lower().replace(" ", "")
    session[_session_key("user_answer")] = answer

    verb, verb_type = session.get(_session_key("current_verb&current_type"), ("", ""))
    tense = session[_session_key("current_time")]
    pronoun = session[_session_key("current_pronoun")]


    if verb_type == "irregulier":
        expected = irregulier_expected(tense, pronoun, pronouns_dict, verb, language)
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
    term = verb[-3:]
    global_inflection = inflection_ending(tense, pronoun, pronouns_dict, "it")

    if term == "rre":
        inflection = "c" + global_inflection
    else:
        inflection = global_inflection

    stem = verb[:-3]

    correct_full = stem + ("h" if verb.endswith("c") else "") + inflection
    verify_answer(correct_full, xp=1)

def es_evaluate_regular(verb, tense, pronoun, pronouns_dict):
    global_inflection = inflection_ending(tense, pronoun, pronouns_dict, "es")

    if tense in ["futur", "conditionnel"]:
        correct_full = verb + global_inflection
    else:
        correct_full = verb[:-2] + global_inflection
    verify_answer(correct_full, xp=1)

def record_error():
    session.setdefault(_session_key("error_times"), []).append(session[_session_key("current_time")])
    session.setdefault(_session_key("error_pronouns"), []).append(session[_session_key("current_pronoun")])
    session.setdefault(_session_key("error_verbs"), []).append(session[_session_key("current_verb&current_type")])

def select_new_verb(language):
    vtype = session.get(_session_key("verb_type"))
    if vtype == "tous":
        choice_ir = rd.choice([True, False])
        vtype = "irregulier" if choice_ir else "regulier"

    verb = verb_choice(vtype, language)

    session[_session_key("current_verb&current_type")] = (verb, vtype)


def apply_error_repetition(pronouns_dict):
    counter = session.get(_session_key("counter"), 0)
    reset_error()
    if counter >= 2:
        session[_session_key("current_time")] = session[_session_key("error_times")].pop(0)
        session[_session_key("current_pronoun")] = session[_session_key("error_pronouns")].pop(0)
        session[_session_key("current_verb&current_type")] = session[_session_key("error_verbs")].pop(0)
        session.pop(_session_key("counter"), None)
        return "Tu as fait une erreur récemment sur ce verbe, conjugue-le à nouveau !"

    session[_session_key("current_time")] = rd.choice(session[_session_key("active_times")])
    session[_session_key("current_pronoun")] = rd.choice(list(pronouns_dict.keys()))
    session[_session_key("counter")] = counter + 1 # if session.get(_session_key("is_correct")) else 0
    return ""

def reset_error():
    if session.get(_session_key("error_times")) and len(session[_session_key("error_times")])>= 5:
        session.pop(_session_key("error_times"), None)
        session.pop(_session_key("error_pronouns"), None)
        session.pop(_session_key("error_verbs"), None)

def inflection_ending(tense, pronoun, pronouns_dict, language):

    tense_inflection = Conjugaison_regulier.query.filter_by(language=language, tense=tense).first()
    name_pronoun = pronouns_dict[pronoun]

    return getattr(tense_inflection, name_pronoun, None)

def irregulier_expected(tense, pronoun, pronouns_dict, infinitif, language):

    tense_inflection = Conjugaison_irregulier.query.filter_by(language=language, tense=tense, infinitif=infinitif).first()
    name_pronoun = pronouns_dict[pronoun]

    return getattr(tense_inflection, name_pronoun, None)

def verb_choice(verb_type, language):
    verbs = Conjugaison_verbe.query.filter_by(language=language, verb_type=verb_type).all()
    return rd.choice(verbs).verbs
