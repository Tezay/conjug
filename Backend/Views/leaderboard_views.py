from flask import Blueprint
from flask_login import current_user

from Backend.Services.leaderboard_services import classement_joueur, classement_semaine, classement_mois
from Backend.Utils.helpers import utilisateurs

leaderboard_bp = Blueprint('leaderboard', __name__,)


@leaderboard_bp.route('/leaderboard', methods=['GET', 'POST'])
def leaderboard():

    return {
        "username": current_user.username,
        "utilisateurs": utilisateurs(),
        "classement_tout": classement_joueur(),
        "classement_semaine": classement_semaine(),
        "classement_mois": classement_mois(),
    }