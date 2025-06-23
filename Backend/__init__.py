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

    # CORS(app, supports_credentials=True, origins=["http://localhost:3000", "https://tonsite.com"])

    db.init_app(app)
    login_manager.init_app(app)
    hashing.init_app(app)

    login_manager.login_view = '/home'

    from .Views.main_views import main_bp
    from .Views.auth_views import auth_bp
    from .Views.user_views import user_bp
    from .Views.leaderboard_views import leaderboard_bp
    from .Views.conjugaison_views import conjugaison_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(leaderboard_bp)
    app.register_blueprint(conjugaison_bp)

    with app.app_context():
        db.create_all()

    # @app.before_request
    # def before_every_request():
    #     session.setdefault('langue', 'fr')

    return app