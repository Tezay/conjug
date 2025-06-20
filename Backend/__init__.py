from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_hashing import Hashing

db = SQLAlchemy()
login_manager = LoginManager()
hashing = Hashing()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    db.init_app(app)
    login_manager.init_app(app)
    hashing.init_app(app)

    login_manager.login_view = '/home'

    from .Views.main_views import home_bp
    from .Views.auth_views import auth_bp
    from .Views.user_views import user_bp


    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)

    return app