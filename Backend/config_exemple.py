SECRET_KEY = "dev_secret_key"

# URI de connexion à la base MariaDB
SQLALCHEMY_DATABASE_URI = "mariadb+mariadbconnector://utilisateur:motdepasse@localhost:3306/nom_de_la_base"

# Désactive le suivi inutile des modifications d'objets
SQLALCHEMY_TRACK_MODIFICATIONS = False