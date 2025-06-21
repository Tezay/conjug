from flask import Blueprint, session, request

from Backend.Services.conjugaison_services import (init_active_times, sync_time_checkboxes, init_verb_type, handle_user_response,
                                                   select_new_verb, apply_error_repetition, set_default)

conjugaison_bp = Blueprint('auth', __name__)

@conjugaison_bp.route('/de', methods=['GET', 'POST'])
def de():

    return {}

@conjugaison_bp.route('/it', methods=['GET', 'POST'])
def it():

    set_default()

    if "temps" in request.form:
        init_active_times(request.form)
        sync_time_checkboxes()
        init_verb_type(request.form)

    if "reponse" in request.form:
        handle_user_response(request.form)

    if "continue" in request.form or "verb_type" in request.form:
        select_new_verb()
        message = apply_error_repetition()
    else:
        message = ""

    return {
        "time": session["it_current_time"],
        "pronouns": session["it_current_pronoun"],
        "verb": session["it_current_verb&current_type"][0], #ne chosis que le verbe et pas son type
        "is_correct": session["it_is_correct"],
        "correct_answer": session.get("it_correct_answer", ""),
        "checked_times": {t: session[f"it_checked_{t}"] for t in TIME_KEYS},
        "verb_type": session["it_verb_type"],
        "message": message,
    }