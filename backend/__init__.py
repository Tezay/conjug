import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_hashing import Hashing
from flask_cors import CORS

db = SQLAlchemy()
login_manager = LoginManager()
hashing = Hashing()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    if os.getenv('APP_ENV') == 'development':
        CORS(app, supports_credentials=True, origins="*")
    else:
        frontend_domain = os.getenv('FRONTEND_DOMAIN')
        CORS(app, supports_credentials=True, origins=[f'https://{frontend_domain}'])

    db.init_app(app)
    login_manager.init_app(app)
    hashing.init_app(app)

    login_manager.login_view = '/api/home'

    from .views.main_views import main_bp
    from .views.auth_views import auth_bp
    from .views.user_views import user_bp
    from .views.leaderboard_views import leaderboard_bp
    from .views.conjugaison_views import conjugaison_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(leaderboard_bp)
    app.register_blueprint(conjugaison_bp)

    try:
        with app.app_context():
            db.create_all()
    except Exception as e:
        pass

    return app