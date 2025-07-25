from flask import Blueprint

from backend.services.leaderboard_services import classement_joueur, classement_semaine, classement_mois
from backend.utils.helpers import utilisateurs

leaderboard_bp = Blueprint('leaderboard', __name__)


@leaderboard_bp.route('/leaderboard', methods=['GET', 'POST'])
def leaderboard():

    return {
        "utilisateurs": utilisateurs(),
        "classement_tout": classement_joueur(),
        "classement_semaine": classement_semaine(),
        "classement_mois": classement_mois(),
    }