from flask_sqlalchemy import SQLAlchemy

from conjugFR.views import app

db = SQLAlchemy()

db.init_app(app)


class User(db.Model):
    """donne les paramètres des colonnes de la table user de la base de données"""

    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(length=100), nullable=False)
    firstname = db.Column(db.String(length=100), nullable=False)
    lastname = db.Column(db.String(length=100), nullable=False)
    username = db.Column(db.String(length=100), nullable=False)
    password = db.Column(db.String(length=100), nullable=False)
    etablissement = db.Column(db.String(length=100))
    xp = db.Column(db.Integer)
    level = db.Column(db.Integer)
    date_creation = db.Column(db.String(length=100))
    logo = db.Column(db.String(length=100))
    day_streak = db.Column(db.Integer)
    classement = db.Column(db.Integer)

    # def __init__(self, email, firstname, lastname, username, password, etablissement, xp, level, date_creation, logo,
    #              day_streak, classement):
    #     """fonction qui creer la tables user et les colonnes de la table dans la base de données"""
    #     self.email = email
    #     self.firstname = firstname
    #     self.lastname = lastname
    #     self.username = username
    #     self.password = password
    #     self.etablissement = etablissement
    #     self.xp = xp
    #     self.level = level
    #     self.date_creation = date_creation
    #     self.logo = logo
    #     self.day_streak = day_streak
    #     self.classement = classement


with app.app_context():
    db.drop_all()
    db.create_all()


def addUser(email, firstname, lastname, username, password, etablissement, xp, level, date_creation, logo, day_streak,
            classement):
    """ajoute les utilisateurs à la base de données avec les infos données à la création d'un compte(Nom, Prénom ...)"""
    newUser = User(email=email, firstname=firstname, lastname=lastname, username=username,
                   password=password, etablissement=etablissement, xp=xp, level=level,
                   date_creation=date_creation, logo=logo, day_streak=day_streak, classement=classement)
    db.session.add(newUser)
    db.session.commit()


def addPoint(username):
    """ajoute un point à l'xp de l'utilisateur quand il conjugue bien un verbe"""
    user = User.query.all()
    for val in user:
        if val.username == username:
            val.xp += 1
            db.session.commit()
