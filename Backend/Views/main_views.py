from flask import Blueprint
from flask_login import current_user

from Backend.Utils.helpers import utilisateurs

home_bp = Blueprint('home', __name__,)


@home_bp.route("/home", methods=['GET', 'POST'])
def home():

    return {
        "username": current_user.username,
    }

@home_bp.route("/search", methods=['GET', 'POST'])
def search():

    return {
        "username": current_user.username,
        "utilisateurs": utilisateurs(),
    }