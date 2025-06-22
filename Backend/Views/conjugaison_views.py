from flask import Blueprint, session, request

from Backend.Services.conjugaison_services import (init_active_times, sync_time_checkboxes, init_verb_type, handle_user_response,
                                                   select_new_verb, apply_error_repetition)

conjugaison_bp = Blueprint('conjugaison', __name__)

it_time_keys = ["present", "futur", "conditionnel", "imparfait", "passe_simple"]
it_pronouns_dict = {"io": "prem_pers_sing", "tu": "deux_pers_sing", "lui": "trois_pers_sing",
                    "noi": "prem_pers_plur", "voi": "deux_pers_plur", "loro": "trois_pers_plur"}

es_time_keys = ["present_ind", "futur", "conditionnel", "present_subj", "imparfait_ind", "imparfait_subj", "passe_simple" ]
es_pronouns_dict = {"yo": "prem_pers_sing", "tú": "deux_pers_sing", "él": "trois_pers_sing",
                    "nosotros": "prem_pers_plur", "vosotros": "deux_pers_plur", "ellos": "trois_pers_plur"}

@conjugaison_bp.route('/de', methods=['GET', 'POST'])
def de():

    return {}

@conjugaison_bp.route('/it', methods=['GET', 'POST'])
def it():

    if "temps" in request.form:
        init_active_times(request.form, it_pronouns_dict)
        sync_time_checkboxes(it_time_keys)
        init_verb_type(request.form)

    if "reponse" in request.form:
        handle_user_response(request.form, it_pronouns_dict, "it")

    if "continue" in request.form or "verb_type" in request.form:
        select_new_verb("it")
        message = apply_error_repetition(it_pronouns_dict)
    else:
        message = None

    return {
        "time": session.get("it_current_time", "temps"),
        "pronouns": session.get("it_current_pronoun", "pronoms"),
        "verb": session.get("it_current_verb&current_type", ("verbe",))[0], #ne chosis que le verbe et pas son type
        "is_correct": session.get("it_is_correct", None),
        "correct_answer": session.get("it_correct_answer", None),
        "checked_times": {t: session.get(f"it_checked_{t}", None) for t in it_time_keys},
        "verb_type": session.get("it_verb_type", None),
        "message": message,
    }

@conjugaison_bp.route('/es', methods=['GET', 'POST'])
def es():

    set_default()

    if "temps" in request.form:
        init_active_times(request.form, es_pronouns_dict)
        sync_time_checkboxes(es_time_keys)
        init_verb_type(request.form)

    if "reponse" in request.form:
        handle_user_response(request.form, es_pronouns_dict, "es")

    if "continue" in request.form or "verb_type" in request.form:
        select_new_verb("es")
        message = apply_error_repetition(es_pronouns_dict)
    else:
        message = None

    return {
        "time": session.get("es_current_time", "temps"),
        "pronouns": session.get("es_current_pronoun", "pronoms"),
        "verb": session.get("es_current_verb&current_type", ("verbe",))[0], #ne chosis que le verbe et pas son type
        "is_correct": session.get("es_is_correct", None),
        "correct_answer": session.get("es_correct_answer", None),
        "checked_times": {t: session.get(f"es_checked_{t}", None) for t in es_time_keys},
        "verb_type": session.get("es_verb_type", None),
        "message": message,
    }