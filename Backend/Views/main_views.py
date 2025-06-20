from flask import Blueprint, render_template

home_bp = Blueprint('home', __name__,)

@home_bp.route("/home", methods=['GET', 'POST'])
def home():
    """fonction qui renvoie la page d'acceuil du site"""

    return {
        "username": session["username"],
    }
