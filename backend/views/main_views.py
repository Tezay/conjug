from flask import Blueprint
from flask_login import current_user

from backend.utils.helpers import utilisateurs

main_bp = Blueprint('main', __name__)


@main_bp.route('/status', methods=['GET'])
def auth_status():
    if current_user.is_authenticated:
        return {
            "status": "connected",
            "username": current_user.username
        }
    else:
        return {
            "status": "connexion"
        }

@main_bp.route("/home", methods=['GET', 'POST'])
def home():

    return {}

@main_bp.route("/search", methods=['GET', 'POST'])
def search():

    return {
        "utilisateurs": utilisateurs(),
    }


