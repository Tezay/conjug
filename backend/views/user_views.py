from flask import Blueprint

from backend.services.leaderboard_services import classement_joueur
from backend.models import User

user_bp = Blueprint('user', __name__)


@user_bp.route("/connexion", methods=['GET', 'POST'])
def connexion():

    return {}

@user_bp.route("/profile/<username>", methods=['GET', 'POST'])
def profile(username):

    if User.query.filter_by(username=username).first():
        visite_user = User.query.filter_by(username=username).first()
        leaderboard_entry = visite_user.leaderboard_entry

        # Valeurs par défaut si pas d'entrée leaderboard
        level = "Débutant"
        xp = 0
        rank = 0
        
        if leaderboard_entry:
            level = leaderboard_entry.level
            xp = leaderboard_entry.xp
            rank = leaderboard_entry.rank

        return {
            "username": visite_user.username,
            "institution": visite_user.institution,
            "logo": visite_user.logo,
            "date_creation": visite_user.date_creation,
            "day_streak": visite_user.day_streak,

            "level": level,
            "xp": xp,
            "rank": rank,
            "classement_joueur": classement_joueur(),
        }

    return "User Not Found"