from flask import Flask, render_template, request, session, redirect, flash, url_for
from flask_hashing import Hashing
import random
from datetime import datetime

from . import models
from . import csvReader
from . import csvReaderIrregular
from .utils import listPronouns, correspondanceTime, correspondanceTimeIrregular, correspondanceVerb, \
    correspondanceTermination

app = Flask(__name__)
app.config.from_object('config')
hashing = Hashing(app)


def before_request():
    """fonction qui initialise les sessions de flask pour éviter des erreurs"""
    if not ("username" in session):
        session["username"] = "Connexion"
    if not ('time' in session):
        session["time"] = "temps"
        session["pronouns"] = "pronoms"
        session["verb"] = 'verbe'

    if not ("banane" in session):
        session["banane"] = None
        session["banane2"] = None
        session["banane3"] = None
        session["banane4"] = None
        session["banane5"] = None
        session["banane6"] = None
        session["banane7"] = None
        session["kiwi"] = None
        session["kiwi2"] = None
        session["kiwi3"] = None

    if not ("username" in session):
        session["username"] = "Connexion"

    if not ("erreur_time" in session):
        session["erreur_time"] = []
        session["erreur_pronouns"] = []
        session["erreur_verb"] = []
        session["erreur_type"] = []

    if "erreur_verb" in session and len(session["erreur_verb"]) >= 4:
        session["erreur_time"] = [session["erreur_time"][-1]]
        session["erreur_pronouns"] = [session["erreur_pronouns"][-1]]
        session["erreur_verb"] = [session["erreur_verb"][-1]]
        session["erreur_type"] = [session["erreur_type"][-1]]


# Home page

@app.route("/", methods=['GET', 'POST'])
def home():
    """fonction qui renvoie la page d'acceuil du site"""

    before_request()

    return render_template("home.html",
                           username=session["username"])


# German page

@app.route("/de", methods=['GET', 'POST'])
def de():
    """fonction qui renvoie la page d'allemand du site"""

    before_request()

    return render_template("language/german.html",
                           username=session["username"])


# Italian page

@app.route("/it", methods=['GET', 'POST'])
def it():
    """fonction qui renvoie la page d'italien du site"""

    before_request()

    return render_template("language/italian.html",
                           username=session["username"])


# Spanish page

@app.route("/es", methods=['GET', 'POST'])
def es():
    """fonction qui traite les temps et types de verbes(réguliers, irréguliers) que l'utilisateur veut réviser
    et renvoie un verbe un pronom un temps pour réviser sur la page d'espagnol du site/ et qui traite aussi
     la réponse de l'utilisateur si fausse renvoie la réponse, sinon dit bonne réponse sur la page d'espagnol du site
     et met en place un système de rappel pour que l'utilisateur ne se trompe plus sur les mêmes verbes"""

    before_request()
    reponseUser = ""
    rappel = ""

    verif = request.form.get("temps[]")

    if verif == "Futuro" or verif == "Conditional" or verif == "Presente de indicativo" or verif == "Presente de subjonctivo" or verif == "Pretérito imperfecto de indicativo" or verif == "Pretérito indefinido" or verif == "Prétero imperfecto de subjonctivo":

        session["listActiveTimes"] = request.form.getlist("temps[]")
        session["time"] = random.choice(session["listActiveTimes"])
        session["pronouns"] = random.choice(listPronouns)

        bananes = {"Futuro": "banane", "Conditional": "banane2", "Presente de indicativo": "banane3",
                   "Presente de subjonctivo": "banane4", "Pretérito imperfecto de indicativo": "banane5",
                   "Pretérito indefinido": "banane6", "Prétero imperfecto de subjonctivo": "banane7"}

        for time in bananes:
            if time in session["listActiveTimes"]:
                session[bananes[time]] = "checked"
            else:
                session[bananes[time]] = None

    if request.form.get("drone") == "irreguliers":

        session["kiwi3"] = "checked"
        session["kiwi"] = None
        session["kiwi2"] = None
        session["verb"] = csvReaderIrregular.verbChoice()
        session["irregular"] = True
        session["tous"] = False

    elif request.form.get("drone") == "tous":

        aleatoire = random.randint(0, 1)
        session["kiwi2"] = "checked"
        session["kiwi3"] = None
        session["kiwi"] = None

        if aleatoire == 0:
            session["verb"] = csvReaderIrregular.verbChoice()
            session["irregular"] = True
            session["tous"] = True

        else:
            session["verb"] = csvReader.verbChoice()
            session["tous"] = True
            session["irregular"] = False

    elif request.form.get("drone") == "reguliers":

        session["kiwi"] = "checked"
        session["kiwi2"] = None
        session["kiwi3"] = None
        session["verb"] = csvReader.verbChoice()
        session["tous"] = False
        session["irregular"] = False

    if request.form.get("reponse") is not None and len(request.form.get("reponse")) >= 0 and session["verb"] != "verbe":

        reponse = request.form.getlist("reponse")
        reponseVerb = reponse[0].lower()

        if ("irregular" in session and session["irregular"] == True) or (
                session["erreur_type"] != [] and session["erreur_type"][0] == "irréguliers" and session["compteur"] == 3):

            correction = correspondanceTimeIrregular[session["time"]]()[listPronouns.index(session['pronouns'])][
                correspondanceVerb.index(session["verb"])]

            if reponseVerb == correction:
                reponseUser = "✅ Bonne réponse !"
                models.addPoint(session["username"], 2)

            else:

                reponseUser = "❌ La réponse était: " + str(correction)
                session["erreur_time"] += [session["time"]]
                session["erreur_verb"] += [session["verb"]]
                session["erreur_pronouns"] += [session["pronouns"]]
                session["erreur_type"] += ["irréguliers"]

                if not ("compteur" in session):
                    session["compteur"] = 0

            session["verb"] = csvReaderIrregular.verbChoice()

        else:

            termination = str(session["verb"][-2:])

            correction = correspondanceTime[session["time"]]()[listPronouns.index(session['pronouns'])][
                correspondanceTermination.index(termination)]

            if (reponseVerb == session["verb"][:-2] + correction and session["time"] != "Futuro" and session[
                "time"] != "Conditional") or (
                    (session["time"] == "Futuro" or session["time"] == "Conditional") and reponseVerb == session[
                "verb"] + correction):

                reponseUser = "✅ Bonne réponse !"
                models.addPoint(session["username"], 1)

            elif (session["time"] == "Futuro" or session["time"] == "Conditional") and reponseVerb != session[
                "verb"] + correction:

                reponseUser = "❌ La réponse était: " + str(session["verb"] + correction)

            else:

                reponseUser = "❌ La réponse était: " + str(session["verb"][:-2] + correction)

            if reponseUser[0] == "❌":
                session["erreur_time"] += [session["time"]]
                session["erreur_verb"] += [session["verb"]]
                session["erreur_pronouns"] += [session["pronouns"]]
                session["erreur_type"] += ["reguliers"]

                if not ("compteur" in session):
                    session["compteur"] = 0

            session["verb"] = csvReader.verbChoice()

        if "tous" in session and session["tous"] == True:

            aleatoire = random.randint(0, 1)
            if aleatoire == 0:
                session["verb"] = csvReaderIrregular.verbChoice()
                session["irregular"] = True

            else:
                session["verb"] = csvReader.verbChoice()
                session["irregular"] = False

        if "compteur" in session and session["compteur"] == 2:

            session["time"] = session["erreur_time"][0]
            session["pronouns"] = session["erreur_pronouns"][0]
            session["verb"] = session["erreur_verb"][0]
            session["erreur_time"].pop(0)
            session["erreur_pronouns"].pop(0)
            session["erreur_verb"].pop(0)
            session["erreur_verb"].pop(0)
            rappel = "Tu as fait une erreur récemment sur ce verbe, conjugue le à nouveau !"

        else:
            session["time"] = random.choice(session["listActiveTimes"])
            session["pronouns"] = random.choice(listPronouns)

        if "compteur" in session and session["compteur"] == 3:
            session.pop("compteur")

        if "compteur" in session:
            session["compteur"] += 1

    return render_template("language/spanish.html",
                           time=session["time"],
                           pronouns=session["pronouns"],
                           verb=session["verb"],
                           reponseUser=reponseUser,
                           banane=session["banane"],
                           banane2=session["banane2"],
                           banane3=session["banane3"],
                           banane4=session["banane4"],
                           banane5=session["banane5"],
                           banane6=session["banane6"],
                           banane7=session["banane7"],
                           kiwi=session["kiwi"],
                           kiwi2=session["kiwi2"],
                           kiwi3=session["kiwi3"],
                           username=session["username"],
                           rappel=rappel)


@app.route("/connexion", methods=['GET', 'POST'])
def connexion():
    """fonction qui renvoie la page de connexion et de création de compte du site"""

    before_request()

    return render_template("login.html",
                           username=session["username"])


@app.route("/signup", methods=['GET', 'POST'])
def signup():
    """fonction qui traite la création de compte en vérifiant un compte avec cette adresse email n'existe pas déjà:
    si existe renvoie a la page de connexion sinon envoie a la page d'acceuil du site"""

    user = models.User.query.all()
    for val in user:
        if request.form.get("email") == val.email:
            flash("Adresse email déjà utilisé")
            return redirect(url_for("connexion"))
        elif request.form.get("username") == val.username:
            flash("Nom d'utilisateur déjà utilisé")
            return redirect(url_for("connexion"))

    email = request.form.get("email")
    firstname = request.form.get("firstname")
    lastname = request.form.get("lastname")
    username = request.form.get("username")
    password = hashing.hash_value(request.form.get("password"), salt='abcd')
    etablissement = request.form.get("etablissement")
    date_creation = datetime.now().strftime('%d/%m/%Y')
    logo = "banana"
    models.addUser(email, firstname, lastname, username, password, etablissement, 0, 0, date_creation, logo, 1, 0)
    session["username"] = username
    flash("Bienvenue et bonne conjugaison")

    return redirect(url_for("home"))


@app.route("/signin", methods=['GET', 'POST'])
def signin():
    """fonction qui traite la connexion a un compte existant: si il existe l'envoie vers la page d'acceuil connecter
    sinon le renvoie a la page connexion"""
    user = models.User.query.all()
    for val in user:
        if request.form.get("email") == val.email and hashing.check_value(val.password, request.form.get("password"),
                                                                          salt='abcd'):
            flash("Connexion réussi")
            session["username"] = val.username
            return redirect(url_for("home"))

        elif request.form.get("email") == val.email:
            flash("Mot de passe incorrect")
            return redirect(url_for("connexion"))

    flash("Pas de compte utilisateur pour cette adresse email")
    return redirect(url_for("connexion"))


@app.route("/logout", methods=['GET', 'POST'])
def logout():
    """fonction permettant de ce déconnecter de sont compte """
    session["username"] = "Connexion"
    flash("Déconnection réussi")
    return redirect(url_for("home"))


# @app.route("/settings", methods=['GET', 'POST'])
# def profile():
#     """fonction qui renvoie la page de profil pour chaque utilisateur avec sont mot de passe, sa date de création..."""
#
#     before_request()
#
#     return render_template("heritage_template/profile.html", username=session["username"])


@app.route("/profile/<username>", methods=['GET', 'POST'])
def username_route(username):
    user = models.User.query.all()
    session["url"] = request.path
    for val in user:
        if val.username == username:
            date_creation = val.date_creation
            xp = val.xp
            etablissement = val.etablissement
            level = val.level
            day_streak = val.day_streak
            logo = val.logo
            classement = val.classement
            return render_template("heritage_template/profile.html",
                                   date_creation=date_creation,
                                   xp=xp,
                                   etablissement=etablissement,
                                   day_streak=day_streak,
                                   logo=logo,
                                   username2=username,
                                   level=level,
                                   classement=classement,
                                   username=session["username"])
    return "User Not Found"


@app.route("/partager", methods=['GET', 'POST'])
def partager():
    flash("Le lien du profil a bien été copié")
    return redirect(url_for("username_route", username=session["username"]))
