from flask import Blueprint, request, jsonify, redirect, url_for, render_template
from flask_login import login_user, logout_user, login_required, current_user
from Backend.Services.user_services import verify_user, create_user
from Backend.Models.user import User
from Backend import login_manager

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.form
        user = verify_user(data['username'], data['password'])
        if user:
            login_user(user)
            return redirect(url_for('user.profile'))
        return "Identifiants invalides", 401
    return render_template('login.html')

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.form
        user = create_user(data['username'], data['password'])
        login_user(user)
        return redirect(url_for('user.profile'))
    return render_template('register.html')