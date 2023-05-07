from flask_sqlalchemy import SQLAlchemy
from datetime import date, timedelta, datetime

from .views import app

db = SQLAlchemy()

db.init_app(app)


class User(db.Model):
    """donne les paramètres des colonnes de la table user de la base de données"""

    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(length=100), nullable=False)
    verif = db.Column(db.Boolean, nullable=False)
    mailtoken = db.Column(db.String(length=24))
    firstname = db.Column(db.String(length=100), nullable=False)
    lastname = db.Column(db.String(length=100), nullable=False)
    username = db.Column(db.String(length=100), nullable=False)
    password = db.Column(db.String(length=100), nullable=False)
    etablissement = db.Column(db.String(length=100))
    xp = db.Column(db.Integer, nullable=False)
    level = db.Column(db.String(length=100), nullable=False)
    date_creation = db.Column(db.String(length=100), nullable=False)
    logo = db.Column(db.String(length=255), nullable=False)
    day_streak = db.Column(db.Integer, nullable=False)
    classement = db.Column(db.Integer, nullable=False)
    XP_week = db.Column(db.Integer, nullable=False)
    XP_month = db.Column(db.Integer, nullable=False)


class LeaderboardReset(db.Model):
    __tablename__ = "leaderboard_reset"
    id = db.Column(db.Integer, primary_key=True)
    point_reset = db.Column(db.Integer, default=0)


with app.app_context():
    """créer la table user"""
    db.create_all()


def addUser(email, verif, mailtoken, firstname, lastname, username, password, etablissement, xp, level, date_creation, logo, day_streak,
            classement, XP_week, XP_month):
    """ajoute les utilisateurs à la base de données avec les infos données à la création d'un compte(Nom, Prénom ...)"""
    newUser = User(email=email,verif=verif, mailtoken=mailtoken, firstname=firstname, lastname=lastname, username=username,
                   password=password, etablissement=etablissement, xp=xp, level=level,
                   date_creation=date_creation, logo=logo, day_streak=day_streak, classement=classement,
                   XP_week=XP_week, XP_month=XP_month)
    db.session.add(newUser)
    db.session.commit()


def addPoint(username, point):
    """ajoute un point à l'xp de l'utilisateur quand il conjugue bien un verbe 2 si verbe irréguliers, 1 si verbe réguliers"""
    user = User.query.all()
    for val in user:
        if val.username == username:
            val.xp += point
            val.XP_week += point
            val.XP_month += point
            db.session.commit()


def modifyClassement(dico):
    "Modifier le classement en fonction de l'xp"
    user = User.query.all()
    for rang, data in dico.items():
        username = data[0]
        classement = rang
        for val in user:
            if val.username == username:
                val.classement = classement

    db.session.commit()


def editLogo(lien):
    """modifier le logo de l'utilisateur"""
    user = User.query.all()

    for val in user:
        val.logo = lien
    db.session.commit()


def reset_xp():
    month = date.today() - timedelta(days=1)
    month = month.strftime('%m')
    week = date.today() - timedelta(7)

    reset = LeaderboardReset.query.all()
    user = User.query.all()

    for val in reset:
        date_reset = val.point_reset

    if week.weekday() == 1:
        for val in reset:
            val.point_reset = 0

    if int(date.today().strftime('%m')) != int(month) and date_reset == 0:
        for val in user:
            if val.username != "test":
                val.xp_month = 0

        for val in reset:
            val.point_reset += 1

    if week.weekday() == 0 and date_reset == 0:
        for val in user:
            if val.username != "test":
                val.xp_week = 0

        for val in reset:
            val.point_reset += 1

    db.session.commit()


def addReset(point_reset):
    db.session.add(LeaderboardReset(point_reset=point_reset))
    db.session.commit()

def verif(mailtoken, username):

    user = User.query.all()

    for val in user:
        if mailtoken == val.mailtoken and username == val.username:
            val.verif = True
            db.session.commit()
            return True

    return False

def changePassword(mailtoken, username, password):

    user = User.query.all()

    for val in user:
        if mailtoken == val.mailtoken and username == val.username:
            val.password = password
            db.session.commit()
            return True

    return False


def addToken(token, username):

    user = User.query.all()

    for val in user:
        if username == val.username:
            firstname = val.firstname
            lastname = val.firstname
            mail = val.email
            val.mailtoken = token

            db.session.commit()

    return (firstname, lastname, mail)