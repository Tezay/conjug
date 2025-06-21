from flask import Blueprint

from Backend.Services.leaderboard_services import classement_joueur, classement_semaine, classement_mois
from Backend.Utils.helpers import utilisateurs

leaderboard_bp = Blueprint('leaderboard', __name__)


@leaderboard_bp.route('/leaderboard', methods=['GET', 'POST'])
def leaderboard():

    return {
        "utilisateurs": utilisateurs(),
        "classement_tout": classement_joueur(),
        "classement_semaine": classement_semaine(),
        "classement_mois": classement_mois(),
    }