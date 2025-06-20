from flask import Blueprint
from flask_login import current_user

from Backend.Utils.helpers import utilisateurs

home_bp = Blueprint('home', __name__,)


@home_bp.route("/home", methods=['GET', 'POST'])
def home():

    return {}

@home_bp.route("/search", methods=['GET', 'POST'])
def search():

    return {
        "utilisateurs": utilisateurs(),
    }

@home_bp.route('/status', methods=['GET'])
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
