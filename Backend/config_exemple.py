SECRET_KEY = "dev_secret_key"

# URI de connexion à la base MariaDB
SQLALCHEMY_DATABASE_URI = "mariadb+mariadbconnector://utilisateur:motdepasse@localhost:3306/nom_de_la_base"

# Désactive le suivi inutile des modifications d'objets
SQLALCHEMY_TRACK_MODIFICATIONS = False

SESSION_COOKIE_HTTPONLY = True # Rend les cookies de session accessibles uniquement par le serveur (empêche JavaScript d'y accéder)
SESSION_COOKIE_SECURE = True # Rend les cookies valides uniquement sur HTTPS (important en production)
SESSION_COOKIE_SAMESITE = 'None'
PERMANENT_SESSION_LIFETIME = 86400 # en secondes
SESSION_PERMANENT = True # Garde la session même àla fermeture du navigateur
