from flask import Blueprint, request
from flask_login import login_user, logout_user, login_required
from Backend.Models import User
from Backend.Utils.helpers import create_user, verify_signup, verify_login
from Backend import login_manager, hashing

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        firstname = request.form['first_name']
        lastname = request.form['last_name']
        username = request.form['username'].lower()
        institution = request.form['institution']
        password = request.form['password']

        informations = {email: email,
                firstname: firstname,
                lastname: lastname,
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
