from flask import Blueprint, request
from flask_login import login_user, logout_user, login_required

from Backend.Models import User
from Backend.Services.auth_services import create_user, verify_signup, verify_login, verify_email, change_password, \
    add_token
from Backend import login_manager, hashing

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


### Connexion ###

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        username = request.form['username'].lower()
        institution = request.form['institution']
        password = request.form['password']

        informations = {email: email,
                first_name: first_name,
                last_name: last_name,
                username: username,
                institution: institution,
                password: hashing.hash_value(password, salt='abcd')}

        verif, res = verify_signup(informations)

        if verif:
            user = create_user(informations)
            login_user(user)
            return {
                "retour": "trueCreation"
            }

        return {
            "retour": res
        }

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        informations = {
            'email': email,
            'password': hashing.hash_value(password, salt='abcd')
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

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()

    return {
        "redirect": "true"
    }


### Verification de l'utilisateur ###

@auth_bp.route('/verif/<username>/<mail_token>', methods=['GET', 'POST'])
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

@auth_bp.route('/forget_password/<username>/<mail_token>', methods=['GET', 'POST'])
def forget_password(username, mail_token):
    if request.method == 'GET':
        password = hashing.hash_value(request.form['password'], salt='abcd')

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

@auth_bp.route('/forget_password', methods=['GET', 'POST'])
def send_mail_password():
    if request.method == 'POST':
        email = request.form['email']

        informations = {
            email: email
        }

        user, mail_token = add_token(informations)

        mail(email, "mail_forget_password.html", user.first_name, user.last_name, user.username, mail_token)


