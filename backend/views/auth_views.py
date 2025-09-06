from flask import Blueprint, request, current_app
from flask_login import login_user, logout_user, login_required

from backend import login_manager, hashing
from backend.models import User
from backend.services.auth_services import create_user, verify_register, verify_login, verify_email, change_password, \
    add_token, mail

auth_bp = Blueprint('auth', __name__)


### Connexion ###

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@auth_bp.route('/api/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email'].lower()
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        username = request.form['username'].lower()
        institution = request.form['institution']
        password = request.form['password']

        informations = {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'username': username,
            'institution': institution,
            'password': hashing.hash_value(password, salt=current_app.config["SECRET_KEY"])
        }

        verif, res = verify_register(informations)

        if verif:
            user = create_user(informations)
            login_user(user)
            return {
                "retour": "trueCreation"
            }

        return {
            "retour": res
        }

    return{}

@auth_bp.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        informations = {
            'email': email,
            'password': password
        }

        verif, user = verify_login(informations)

        if verif :
            login_user(user)
            return {
                "retour": "trueAuth"
            }

        return {
            "retour": "falseAuth"
        }

    return {}

@auth_bp.route('/api/logout')
@login_required
def logout():
    logout_user()

    return {
        "redirect": "true"
    }


### Verification de l'utilisateur ###

@auth_bp.route('/api/verif/<username>/<mail_token>', methods=['GET', 'POST'])
@login_required
def verify_user(username, mail_token):
    if request.method == 'GET':
        informations = {
            'username': username,
            'mail_token': mail_token
        }
        verif = verify_email(informations)

        if verif:
            return {
                "retour": "true"
            }

        return {
            "retour": "false"
        }


@auth_bp.route('/api/forget_password/<username>/<mail_token>', methods=['GET', 'POST'])
def forget_password(username, mail_token):
    if request.method == 'POST':
        password = hashing.hash_value(request.form['password'], salt=current_app.config["SECRET_KEY"])

        informations = {
            'username': username,
            'mail_token': mail_token,
            'password': password
        }

        verif = change_password(informations)

        if verif:
            return {
                "retour": "true"
            }

        return {
            "retour": "false"
        }
    
    return {}

@auth_bp.route('/api/forget_password', methods=['GET', 'POST'])
def send_mail_password():
    if request.method == 'POST':
        email = request.form['email']

        informations = {
            email: email
        }

        user, mail_token = add_token(informations)

        mail(email, "mail_forget_password.html", user.first_name, user.last_name, user.username, mail_token)

    return {}

