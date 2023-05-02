from flask_sqlalchemy import SQLAlchemy
from datetime import date, timedelta, datetime

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
    level = db.Column(db.String(length=100))
    date_creation = db.Column(db.String(length=100))
    logo = db.Column(db.String(length=100))
    day_streak = db.Column(db.Integer)
    classement = db.Column(db.Integer)
    XP_week = db.Column(db.Integer)
    XP_month = db.Column(db.Integer)


class LeaderboardReset(db.Model):
    __tablename__ = "leaderboard_reset"
    id = db.Column(db.Integer, primary_key=True)
    point_reset = db.Column(db.Integer, default=0)


with app.app_context():
    """créer la table user"""
    db.create_all()


def addUser(email, firstname, lastname, username, password, etablissement, xp, level, date_creation, logo, day_streak,
            classement, XP_week, XP_month):
    """ajoute les utilisateurs à la base de données avec les infos données à la création d'un compte(Nom, Prénom ...)"""
    newUser = User(email=email, firstname=firstname, lastname=lastname, username=username,
                   password=password, etablissement=etablissement, xp=xp, level=level,
                   date_creation=date_creation, logo=logo, day_streak=day_streak, classement=classement,
                   xp_week=XP_week, xp_month=XP_month)
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


def addReset():
    db.session.add(LeaderboardReset())
    db.session.commit()
