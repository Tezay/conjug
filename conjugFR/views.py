from flask import Flask, render_template, request, session, redirect, flash, url_for
from flask_hashing import Hashing
import random
from datetime import datetime

from . import models
from . import csvReader
from . import csvReaderIrregular
from .utils import *

app = Flask(__name__)
app.config.from_object('config')
hashing = Hashing(app)


def before_request():
    """fonction qui initialise les sessions de flask"""

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

    if "erreur_verb" in session and len(session["erreur_verb"]) >= 5:
        session["erreur_time"] = [session["erreur_time"][-1]]
        session["erreur_pronouns"] = [session["erreur_pronouns"][-1]]
        session["erreur_verb"] = [session["erreur_verb"][-1]]
        session["erreur_type"] = [session["erreur_type"][-1]]

    if not ("reponseUser" in session):
        session["reponseUser"] = ""

    if not ("reponseVerb" in session):
        session["reponseVerb"] = ""


# Home page

@app.route("/", methods=['GET', 'POST'])
def home():
    """fonction qui renvoie la page d'acceuil du site"""

    models.editLogo("link") #A supprimer après modif
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
    """fonction qui traite plusieurs chose:
    -renvoie la page d'espagnol du site
    -les temps et types de verbes chosie par l'utilisateur(qui viennent d'un formulaire du html): renvoie la page d'espagnol 
    du site avec des verbes du bon type (réguliers, irréguliers, tous) à conjuguer avec un pronom personnel et le temps auquel le conjugué.
    -la réponse de l'utilisateur avec un verbe conjuguer: si il est juste renvoie que la page d'espagnol du site avec écrit
    que c'est une bonne réponse sinon renvoie la correction
    
    renvoie aussi un verbe ou l'utilisateur c'est déjà trompé(système de rappel d'erreur) 3 verbes après que l'utilisateur se soient trompé"""

    before_request()

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

    if (request.form.get("reponse") is not None or request.form.get("skip") is not None) and session["verb"] != "verbe":

        if request.form.get("reponse") is not None:
            reponse = request.form.getlist("reponse")
            reponse = reponse[0].lower()

        else:
            reponse = ""

        for chr in reponse:
            if chr != " ":
                session["reponseVerb"] += chr

        if "irregular" in session and session["irregular"] is True :

            correction = correspondanceTimeIrregular[session["time"]]()[listPronouns.index(session['pronouns'])][
                correspondanceVerb.index(session["verb"])]

            if session["reponseVerb"] == correction:
                session["reponseUser"] = True
                models.addPoint(session["username"], 2)

            else:

                session["reponseUser"] = str(correction)
                session["erreur_time"] += [session["time"]]
                session["erreur_verb"] += [session["verb"]]
                session["erreur_pronouns"] += [session["pronouns"]]
                session["erreur_type"] += [True]

                if not ("compteur" in session):
                    session["compteur"] = 0

        else:

            termination = str(session["verb"][-2:])

            correction = correspondanceTime[session["time"]]()[listPronouns.index(session['pronouns'])][
                correspondanceTermination.index(termination)]

            if (session["reponseVerb"] == session["verb"][:-2] + correction and session["time"] != "Futuro" and session[
                "time"] != "Conditional") or (
                    (session["time"] == "Futuro" or session["time"] == "Conditional") and session["reponseVerb"] ==
                    session[
                        "verb"] + correction):

                session["reponseUser"] = True
                models.addPoint(session["username"], 1)

            elif (session["time"] == "Futuro" or session["time"] == "Conditional") and session["reponseVerb"] != \
                    session[
                        "verb"] + correction:

                session["reponseUser"] = str(session["verb"] + correction)

            else:

                session["reponseUser"] = str(session["verb"][:-2] + correction)

            if session["reponseUser"] is not True:
                session["erreur_time"] += [session["time"]]
                session["erreur_verb"] += [session["verb"]]
                session["erreur_pronouns"] += [session["pronouns"]]
                session["erreur_type"] += [False]

                if not ("compteur" in session):
                    session["compteur"] = 0

    verb_type = request.form.get("drone")

    if request.form.get("continue") is not None or verb_type is not None:
        
        session["reponseUser"] = ""
        session["reponseVerb"] = ""

        if verb_type == "tous" or (
                verb_type != "reguliers" and verb_type != "irreguliers" and "tous" in session and session[
            "tous"] is True):

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

        elif verb_type == "irreguliers" or (
                verb_type != "reguliers" and "irregular" in session and session["irregular"] is True):

            session["kiwi3"] = "checked"
            session["kiwi"] = None
            session["kiwi2"] = None
            session["verb"] = csvReaderIrregular.verbChoice()
            session["irregular"] = True
            session["tous"] = False

        else:

            session["kiwi"] = "checked"
            session["kiwi2"] = None
            session["kiwi3"] = None
            session["verb"] = csvReader.verbChoice()
            session["tous"] = False
            session["irregular"] = False

        if "compteur" in session and session["compteur"] == 2:

            session["time"] = session["erreur_time"][0]
            session["pronouns"] = session["erreur_pronouns"][0]
            session["verb"] = session["erreur_verb"][0]
            session["irregular"] = session["erreur_type"][0]
            session["erreur_time"].pop(0)
            session["erreur_pronouns"].pop(0)
            session["erreur_verb"].pop(0)
            session["erreur_type"].pop(0)
            session.pop("compteur")
            rappel = "Tu as fait une erreur récemment sur ce verbe, conjugue le à nouveau !"

        else:
            session["time"] = random.choice(session["listActiveTimes"])
            session["pronouns"] = random.choice(listPronouns)

        if "compteur" in session:
            session["compteur"] += 1

    return render_template("language/spanish.html",
                           time=session["time"],
                           pronouns=session["pronouns"],
                           verb=session["verb"],
                           reponseUser=session["reponseUser"],
                           reponseVerb=session["reponseVerb"],
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
    si existe renvoie à la page de connexion sinon envoie a la page d'acceuil du site"""

    before_request()

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
    usernameBase = request.form.get("username").lower()
    username = ""
    for chr in usernameBase:
        if chr != " " and (
                ord(chr) == 45 or ord(chr) == 46 or 48 <= ord(chr) <= 57 or ord(chr) == 95 or 97 <= ord(chr) <= 122):
            username += chr

    password = hashing.hash_value(request.form.get("password"), salt='abcd')
    etablissement = request.form.get("etablissement")
    date_creation = datetime.now().strftime('%d/%m/%Y')
    logo = "https://cdn.discordapp.com/attachments/1098726716798673016/1099109424590757929/mexicain.png"
    models.addUser(email, firstname, lastname, username, password, etablissement, 0, 0, date_creation, logo, 1, 0)
    session["username"] = username
    flash("Bienvenue et bonne conjugaison")

    return redirect(url_for("home"))


@app.route("/signin", methods=['GET', 'POST'])
def signin():
    """fonction qui traite la connexion à un compte existant: si il existe l'envoie vers la page d'acceuil connecter
    sinon le renvoie à la page de connexion"""

    before_request()

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
    """fonction permettant de ce déconnecter de son compte """

    before_request()

    session["username"] = "Connexion"
    flash("Déconnection réussi")
    return redirect(url_for("home"))


@app.route("/profile/<username>", methods=['GET', 'POST'])
def username_route(username):
    """fonction qui renvoie la page de profil de l'utilisateur rechercher"""

    before_request()
    models.modifyClassement(classements())

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
                                   classementJoueurs=classements(),
                                   username=session["username"])
    return "User Not Found"


@app.route("/share", methods=['GET', 'POST'])
def partager():
    """fonction qui permet de copié le l'url de la page et de partager sont profil"""
    flash("Le lien du profil a bien été copié")
    return redirect(url_for("username_route", username=session["username"]))


@app.route("/search", methods=['GET', 'POST'])
def search():
    """fonction qui renvoie la page de recherche du site"""

    before_request()

    return render_template("search.html", username=session["username"], utilisateurs=utilisateurs())