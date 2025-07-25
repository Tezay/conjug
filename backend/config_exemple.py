import os

SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_secret_key')

# Utilise la variable d'environnement MYSQL_DATABASE
DATABASE = os.getenv('MYSQL_DATABASE', 'name_db')
USER = os.getenv('MYSQL_USER', 'user')
PASSWORD = os.getenv('MYSQL_PASSWORD', 'user_password')
PORT = os.getenv('DATABASE_PORT', '3006')

SQLALCHEMY_DATABASE_URI = (
    f"mariadb+mariadbconnector://{USER}:{PASSWORD}@mariadb:{PORT}/{DATABASE}"
)
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Configuration sécurité et sessions
SESSION_COOKIE_HTTPONLY = True  # Empêche JavaScript d'accéder aux cookies de session
SESSION_COOKIE_SECURE = True    # Utilise HTTPS en production
SESSION_COOKIE_SAMESITE = 'None'
PERMANENT_SESSION_LIFETIME = ...  # durée en secondes
SESSION_PERMANENT = True # Garde la session même à la fermeture du navigateur
