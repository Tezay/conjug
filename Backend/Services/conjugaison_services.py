import random as rd
from flask import session
from flask_login import current_user

from Backend.Services.leaderboard_services import add_xp

### It ###
SESSION_KEY_PREFIX = "it_"

def _session_key(name):
    return SESSION_KEY_PREFIX + name

def set_default():
    session.setdefault(_session_key("current_time"), "temps")
    session.setdefault(_session_key("current_pronoun"), "pronoms")
    session.setdefault(_session_key("current_verb"), "verbe")

def init_active_times(form_data):
    selected = form_data.getlist("temps")
    session[_session_key("active_times")] = selected
    session[_session_key("current_time")] = rd.choice(selected)
    session[_session_key("current_pronoun")] = rd.choice(PRONOUNS_LIST)

def sync_time_checkboxes():
    active = set(session.get(_session_key("active_times"), []))
    for t in TIME_KEYS:
        session[_session_key(f"checked_{t}")] = (t in active)

def init_verb_type(form_data):
    choice = form_data.get("verb_type")
    session[_session_key("verb_type")] = choice or session.get(_session_key("verb_type"), "regulier")

    session[_session_key("checked_regulier")] = (session[_session_key("verb_type")] == "regulier")
    session[_session_key("checked_irregulier")] = (session[_session_key("verb_type")] == "irregulier")
    session[_session_key("checked_tous")] = (session[_session_key("verb_type")] == "tous")

def handle_user_response(form_data):
    answer = form_data.get("reponse", "").strip().lower().replace(" ", "")
    session[_session_key("user_answer")] = answer

    verb, verb_type = session.get(_session_key("current_verb&current_type"), ("", ""))
    tense = session[_session_key("current_time")]
    pronoun = session[_session_key("current_pronoun")]


    if verb_type == "irregulier":
        expected = correspondance_time_irregular_italian[tense]()[PRONOUNS_LIST.index(pronoun)][
            correspondance_verb_italian.index(verb)
        ]
        verify_answer(expected, xp=2)
    else:
        evaluate_regular(verb, tense, pronoun)


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

def evaluate_regular(verb, tense, pronoun):
    term = verb[-3:]
    if term == "rre":
        stem_correction = "c" + correspondance_time_italian[tense]()[PRONOUNS_LIST.index(pronoun)][1]
    else:
        idx = correspondance_termination_italian.index(term)
        stem_correction = correspondance_time_italian[tense]()[PRONOUNS_LIST.index(pronoun)][idx]

    base = verb[:-3]

    correct_full = base + ("h" if verb.endswith("c") else "") + stem_correction
    verify_answer(correct_full, xp=1)

def record_error():
    session.setdefault(_session_key("error_times"), []).append(session[_session_key("current_time")])
    session.setdefault(_session_key("error_pronouns"), []).append(session[_session_key("current_pronoun")])
    session.setdefault(_session_key("error_verbs"), []).append(session[_session_key("current_verb&current_type")])

def select_new_verb():
    vtype = session.get(_session_key("verb_type"))
    if vtype == "tous":
        choice_ir = rd.choice([True, False])
        vtype = "irregulier" if choice_ir else "regulier"

    if vtype == "irregulier":
        session[_session_key("current_verb&current_type")] = (csv_reader_irregular_italian.verb_choice(), "irregulier")

    else:
        session[_session_key("current_verb&current_type")] = (csv_reader_italian.verb_choice(), "regulier")

def apply_error_repetition():
    counter = session.get(_session_key("counter"), 0)
    reset_error()
    if counter >= 2:
        session[_session_key("current_time")] = session[_session_key("error_times")].pop(0)
        session[_session_key("current_pronoun")] = session[_session_key("error_pronouns")].pop(0)
        session[_session_key("current_verb&current_type")] = session[_session_key("error_verbs")].pop(0)
        session.pop(_session_key("counter"), None)
        return "Tu as fait une erreur récemment sur ce verbe, conjugue-le à nouveau !"

    session[_session_key("current_time")] = rd.choice(session[_session_key("active_times")])
    session[_session_key("current_pronoun")] = rd.choice(PRONOUNS_LIST)
    session[_session_key("counter")] = counter + 1 # if session.get(_session_key("is_correct")) else 0
    return ""

def reset_error():
    if session.get(_session_key("error_times")) and len(session[_session_key("error_times")])>= 5:
        session.pop(_session_key("error_times"), None)
        session.pop(_session_key("error_pronouns"), None)
        session.pop(_session_key("error_verbs"), None)