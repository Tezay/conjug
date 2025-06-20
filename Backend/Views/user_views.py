from flask import Blueprint

from Backend.Services.leaderboard_services import classement_joueur
from Backend.Models import User

user_bp = Blueprint('user', __name__, url_prefix='/user')


@user_bp.route("/connexion", methods=['GET', 'POST'])
def connexion():

    return {}

@user_bp.route("/profile/<username>", methods=['GET', 'POST'])
def profile(username):

    if User.query.filter_by(username=username).first():
        visite_user = User.query.filter_by(username=username).first()

        return {
            "username": visite_user.username,
            "institution": visite_user.institution,
            "logo": visite_user.logo,
            "date_creation": visite_user.date_creation,
            "day_streak": visite_user.day_streak,

            "level": visite_user.level,
            "xp": visite_user.xp,
            "rank": visite_user.rank,
            "classement_joueur": classement_joueur(),

        }

    return "User Not Found"