from flask import Blueprint
from flask_login import current_user

from Backend.Services.leaderboard_services import classement_joueur

user_bp = Blueprint('user', __name__, url_prefix='/user')


@user_bp.route("/connexion", methods=['GET', 'POST'])
def connexion():

    return {
        "username": current_user.username,
    }



@user_bp.route("/profile/<username>", methods=['GET', 'POST'])
def profile(username):

    return {
        "username": current_user.username,
        "institution": current_user.institution,
        "logo": current_user.logo,
        "date_creation": current_user.date_creation,
        "day_streak": current_user.day_streak,

        "level": current_user.level,
        "xp": current_user.xp,
        "rank": current_user.rank,
        "classement_joueur": classement_joueur(),

        "username_visite": username,
    }

    return "User Not Found"