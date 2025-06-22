from flask import Blueprint, session, request

from Backend.Services.conjugaison_services import (init_active_times, sync_time_checkboxes, init_verb_type, handle_user_response,
                                                   select_new_verb, apply_error_repetition, set_default)

conjugaison_bp = Blueprint('auth', __name__)

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

    set_default()

    if "temps" in request.form:
        init_active_times(request.form, it_pronouns_dict)
        sync_time_checkboxes(it_time_keys)
        init_verb_type(request.form)

    if "reponse" in request.form:
        handle_user_response(request.form, it_pronouns_dict, "it")

    if "continue" in request.form or "verb_type" in request.form:
        select_new_verb()
        message = apply_error_repetition(it_pronouns_dict)
    else:
        message = ""

    return {
        "time": session["it_current_time"],
        "pronouns": session["it_current_pronoun"],
        "verb": session["it_current_verb&current_type"][0], #ne chosis que le verbe et pas son type
        "is_correct": session["it_is_correct"],
        "correct_answer": session.get("it_correct_answer", ""),
        "checked_times": {t: session[f"it_checked_{t}"] for t in it_time_keys},
        "verb_type": session["it_verb_type"],
        "message": message,
    }