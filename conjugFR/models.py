from flask_sqlalchemy import SQLAlchemy
import sqlalchemy.orm

from config import engine
from conjugFR.views import app

db = SQLAlchemy(app)

Base = sqlalchemy.orm.declarative_base()


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

    def __init__(self, email, firstname, lastname, username, password, etablissement, xp, level, date_creation, logo,
                 day_streak, classement):
        """fonction qui creer la tabloes user et les colonnes de la table dans la base de données"""
        self.email = email
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.password = password
        self.etablissement = etablissement
        self.xp = xp
        self.level = level
        self.date_creation = date_creation
        self.logo = logo
        self.day_streak = day_streak
        self.classement = classement


Base.metadata.create_all(engine)

Session = sqlalchemy.orm.sessionmaker()
Session.configure(bind=engine)
session = Session()


def addUser(email, firstname, lastname, username, password, etablissement):
    """ajoute les utilisateurs à la base de données avec les infos données à la création d'un compte(Nom, Prénom ...)"""
    newUser = User(
        email=email, firstname=firstname, lastname=lastname, username=username, password=password,
        etablissement=etablissement)
    session.add(newUser)
    session.commit()
