from flask import Blueprint
from flask_login import current_user

from backend.utils.helpers import utilisateurs

main_bp = Blueprint('main', __name__)


@main_bp.route('/api/status', methods=['GET'])
def auth_status():
    if current_user.is_authenticated:
        return {
            "status": "connected",
            "username": current_user.username,
            "logo": current_user.logo
        }
    else:
        return {
            "status": "not connected"
        }

@main_bp.route("/api/home", methods=['GET', 'POST'])
def home():

    return {}

@main_bp.route("/api/search", methods=['GET', 'POST'])
def search():

    return {
        "utilisateurs": utilisateurs(),
    }

@main_bp.route("/api/terms", methods=['GET'])
def terms():
    return {"message": "Terms of Service page"}

@main_bp.route("/api/privacy", methods=['GET']) 
def privacy():
    return {"message": "Privacy Policy page"}


