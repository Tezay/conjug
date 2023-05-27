from flask import Flask, render_template, request, session, redirect, flash, url_for
from flask_hashing import Hashing
import random
import secrets

from .utils import *

app = Flask(__name__)
app.config.from_object('config')
hashing = Hashing(app)


def before_request():
    """fonction qui initialise les sessions de flask"""
    # models.addReset(0) #Supprimer après execution
    # models.reset_xp()

    if not ("username" in session):
        session["username"] = "Connexion"

    if not ('timeSpanish' in session):
        session["timeSpanish"] = "temps"
        session["pronounsSpanish"] = "pronoms"
        session["verbSpanish"] = 'verbe'

    if not ("bananeSpanish" in session):
        session["bananeSpanish"] = None
        session["banane2Spanish"] = None
        session["banane3Spanish"] = None
        session["banane4Spanish"] = None
        session["banane5Spanish"] = None
        session["banane6Spanish"] = None
        session["banane7Spanish"] = None
        session["kiwiSpanish"] = None
        session["kiwi2Spanish"] = None
        session["kiwi3Spanish"] = None

    if not ("erreur_timeSpanish" in session):
        session["erreur_timeSpanish"] = []
        session["erreur_pronounsSpanish"] = []
        session["erreur_verbSpanish"] = []
        session["erreur_typeSpanish"] = []

    if "erreur_verbSpanish" in session and len(session["erreur_verbSpanish"]) >= 5:
        session["erreur_timeSpanish"] = [session["erreur_timeSpanish"][-1]]
        session["erreur_pronounsSpanish"] = [session["erreur_pronounsSpanish"][-1]]
        session["erreur_verbSpanish"] = [session["erreur_verbSpanish"][-1]]
        session["erreur_typeSpanish"] = [session["erreur_typeSpanish"][-1]]

    if not ("reponseUserSpanish" in session):
        session["reponseUserSpanish"] = ""

    if not ("reponseVerbSpanish" in session):
        session["reponseVerbSpanish"] = ""

    if not ('timeItalian' in session):
        session["timeItalian"] = "temps"
        session["pronounsItalian"] = "pronoms"
        session["verbItalian"] = 'verbe'

    if not ("bananeItalian" in session):
        session["bananeItalian"] = None
        session["banane2Italian"] = None
        session["banane3Italian"] = None
        session["banane4Italian"] = None
        session["banane5Italian"] = None
        session["kiwiItalian"] = None
        session["kiwi2Italian"] = None
        session["kiwi3Italian"] = None

    if not ("erreur_timeItalian" in session):
        session["erreur_timeItalian"] = []
        session["erreur_pronounsItalian"] = []
        session["erreur_verbItalian"] = []
        session["erreur_typeItalian"] = []

    if "erreur_verbItalian" in session and len(session["erreur_verbItalian"]) >= 5:
        session["erreur_timeItalian"] = [session["erreur_timeItalian"][-1]]
        session["erreur_pronounsItalian"] = [session["erreur_pronounsItalian"][-1]]
        session["erreur_verbItalian"] = [session["erreur_verbItalian"][-1]]
        session["erreur_typeItalian"] = [session["erreur_typeItalian"][-1]]

    if not ("reponseUserItalian" in session):
        session["reponseUserItalian"] = ""

    if not ("reponseVerbItalian" in session):
        session["reponseVerbItalian"] = ""


# Home page

@app.route("/home", methods=['GET', 'POST'])
def home():
    """fonction qui renvoie la page d'acceuil du site"""

    before_request()

    return {
        "username": session["username"],
    }


# German page

@app.route("/de", methods=['GET', 'POST'])
def de():
    """fonction qui renvoie la page d'allemand du site"""

    before_request()

    return {
        "username": session["username"],
    }


# Italian page

@app.route("/it", methods=['GET', 'POST'])
def it():
    """fonction qui renvoie la page d'italien du site"""

    before_request()

    rappel = ""

    verif = request.form.get("temps")

    if verif == "futur" or verif == "conditionnel" or verif == "présent" or verif == "imparfait" or verif == "passé simple":

        session["listActiveTimesItalian"] = request.form.getlist("temps")
        session["timeItalian"] = random.choice(session["listActiveTimesItalian"])
        session["pronounsItalian"] = random.choice(listPronounsItalian)

        bananes = {"futur": "bananeItalian", "conditionnel": "banane2Italian",
                   "présent": "banane3Italian", "imparfait": "banane4Italian",
                   "passé simple": "banane5Italian"}

        for time in bananes:
            if time in session["listActiveTimesItalian"]:
                session[bananes[time]] = "checked"
            else:
                session[bananes[time]] = None

    if request.form.get("reponse") is not None and session["verbItalian"] != "verbe":

        if request.form.get("reponse") is not None:
            reponse = request.form.getlist("reponse")
            reponse = reponse[0].lower()

        else:
            reponse = ""

        for chr in reponse:
            if chr != " ":
                session["reponseVerbItalian"] += chr

        if "irregularItalian" in session and session["irregularItalian"] is True:

            correction = correspondanceTimeIrregularItalian[session["timeItalian"]]()[
                listPronounsItalian.index(session['pronounsItalian'])][
                correspondanceVerbItalian.index(session["verbItalian"])]

            if session["reponseVerbItalian"] == correction:

                session["reponseUserItalian"] = True
                models.addPoint(session["username"], 2)

            else:

                session["reponseUserItalian"] = str(correction)
                session["erreur_typeItalian"] += [True]

        else:

            termination = str(session["verbItalian"][-3:])

            if termination == "rre":
                correction = \
                    "c" + correspondanceTimeItalian[session["timeItalian"]]()[
                        listPronounsItalian.index(session['pronounsItalian'])][1]

            else:
                correction = \
                    correspondanceTimeItalian[session["timeItalian"]]()[
                        listPronounsItalian.index(session['pronounsItalian'])][
                        correspondanceTerminationItalian.index(termination)]

            if session["reponseVerbItalian"] == session["verbItalian"][:-3] + correction and session["verbItalian"][
                -1] != "c":

                session["reponseUserItalian"] = True
                models.addPoint(session["username"], 1)

            elif session["verbItalian"][-1] == "c" and session["reponseVerbItalian"] == session["verbItalian"][
                                                                                        :-3] + "h" + correction:

                session["reponseUserItalian"] = True
                models.addPoint(session["username"], 1)

            elif session["verbItalian"][-1] == "c":

                session["reponseUserItalian"] = str(session["verbItalian"][:-3] + "h" + correction)
                session["erreur_typeItalian"] += [False]

            else:
                session["reponseUserItalian"] = str(session["verbItalian"][:-3] + correction)
                session["erreur_typeItalian"] += [False]

        if session["reponseUserItalian"] is not True:

            session["erreur_timeItalian"] += [session["timeItalian"]]
            session["erreur_verbItalian"] += [session["verbItalian"]]
            session["erreur_pronounsItalian"] += [session["pronounsItalian"]]

            if not ("compteurItalian" in session):
                session["compteurItalian"] = 0

    verb_type = request.form.get("drone")

    if request.form.get("continue") is not None or verb_type is not None:

        session["reponseUserItalian"] = ""
        session["reponseVerbItalian"] = ""

        if verb_type == "tous" or (
                verb_type != "reguliers" and verb_type != "irreguliers" and "tousItalian" in session and session[
            "tousItalian"] is True):

            aleatoire = random.randint(0, 1)
            session["kiwi2Italian"] = "checked"
            session["kiwi3Italian"] = None
            session["kiwiItalian"] = None

            if aleatoire == 0:
                # session["verbItalian"] = csvReaderIrregularItalian.verbChoice()
                session["irregularItalian"] = True
                session["tousItalian"] = True

            else:
                session["verbItalian"] = csvReaderItalian.verbChoice()
                session["tousItalian"] = True
                session["irregularItalian"] = False

        elif verb_type == "irreguliers" or (
                verb_type != "reguliers" and "irregularItalian" in session and session["irregularItalian"] is True):

            session["kiwi3Italian"] = "checked"
            session["kiwiItalian"] = None
            session["kiwi2Italian"] = None
            # session["verbItalian"] = csvReaderIrregularItalian.verbChoice()
            session["irregularItalian"] = True
            session["tousItalian"] = False

        else:

            session["kiwiItalian"] = "checked"
            session["kiwi2Italian"] = None
            session["kiwi3Italian"] = None
            session["verbItalian"] = csvReaderItalian.verbChoice()
            session["tousItalian"] = False
            session["irregularItalian"] = False

        if "compteurItalian" in session and session["compteurItalian"] == 2:

            session["timeItalian"] = session["erreur_timeItalian"][0]
            session["pronounsItalian"] = session["erreur_pronounsItalian"][0]
            session["verbItalian"] = session["erreur_verbItalian"][0]
            session["irregularItalian"] = session["erreur_typeItalian"][0]
            session["erreur_timeItalian"].pop(0)
            session["erreur_pronounsItalian"].pop(0)
            session["erreur_verbItalian"].pop(0)
            session["erreur_typeItalian"].pop(0)
            session.pop("compteurItalian")
            rappel = "Tu as fait une erreur récemment sur ce verbe, conjugue le à nouveau !"

        else:
            session["timeItalian"] = random.choice(session["listActiveTimesItalian"])
            session["pronounsItalian"] = random.choice(listPronounsItalian)

        if "compteurItalian" in session:
            session["compteurItalian"] += 1

    return {
        "time": session["timeItalian"],
        "pronouns": session["pronounsItalian"],
        "verb": session["verbItalian"],
        "reponseUser": session["reponseUserItalian"],
        "reponseVerb": session["reponseVerbItalian"],
        "banane": session["bananeItalian"],
        "banane2": session["banane2Italian"],
        "banane3": session["banane3Italian"],
        "banane4": session["banane4Italian"],
        "banane5": session["banane5Italian"],
        "kiwi": session["kiwiItalian"],
        "kiwi2": session["kiwi2Italian"],
        "kiwi3": session["kiwi3Italian"],
        "username": session["username"],
        "rappel": rappel,
    }


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

    verif = request.form.get("temps")

    if verif is not None:

        session["listActiveTimesSpanish"] = request.form.getlist("temps")
        session["timeSpanish"] = random.choice(session["listActiveTimesSpanish"])
        session["pronounsSpanish"] = random.choice(listPronounsSpanish)

        bananes = {"Futuro": "bananeSpanish", "Conditional": "banane2Spanish",
                   "Presente de indicativo": "banane3Spanish",
                   "Presente de subjonctivo": "banane4Spanish", "Pretérito imperfecto de indicativo": "banane5Spanish",
                   "Pretérito indefinido": "banane6Spanish", "Prétero imperfecto de subjonctivo": "banane7Spanish"}

        for time in bananes:
            if time in session["listActiveTimesSpanish"]:
                session[bananes[time]] = "checked"
            else:
                session[bananes[time]] = None

    if request.form.get("reponse") is not None and session["verbSpanish"] != "verbe":

        if request.form.get("reponse") is not None:
            reponse = request.form.getlist("reponse")
            reponse = reponse[0].lower()

        else:
            reponse = ""

        for chr in reponse:
            if chr != " ":
                session["reponseVerbSpanish"] += chr

        if "irregularSpanish" in session and session["irregularSpanish"] is True:

            correction = correspondanceTimeIrregularSpanish[session["timeSpanish"]]()[
                listPronounsSpanish.index(session['pronounsSpanish'])][
                correspondanceVerbSpanish.index(session["verbSpanish"])]

            if session["reponseVerbSpanish"] == correction:

                session["reponseUserSpanish"] = True
                models.addPoint(session["username"], 2)

            else:

                session["reponseUserSpanish"] = str(correction)

                session["erreur_typeSpanish"] += [True]

        else:

            termination = str(session["verbSpanish"][-2:])

            correction = \
                correspondanceTimeSpanish[session["timeSpanish"]]()[
                    listPronounsSpanish.index(session['pronounsSpanish'])][
                    correspondanceTerminationSpanish.index(termination)]

            if (session["reponseVerbSpanish"] == session["verbSpanish"][:-2] + correction and session[
                "timeSpanish"] != "Futuro" and session[
                    "timeSpanish"] != "Conditional") or (
                    (session["timeSpanish"] == "Futuro" or session["timeSpanish"] == "Conditional") and session[
                "reponseVerbSpanish"] ==
                    session[
                        "verbSpanish"] + correction):

                session["reponseUserSpanish"] = True
                models.addPoint(session["username"], 1)

            elif (session["timeSpanish"] == "Futuro" or session["timeSpanish"] == "Conditional") and session[
                "reponseVerbSpanish"] != \
                    session[
                        "verbSpanish"] + correction:

                session["reponseUserSpanish"] = str(session["verbSpanish"] + correction)
                session["erreur_typeSpanish"] += [False]

            else:

                session["reponseUserSpanish"] = str(session["verbSpanish"][:-2] + correction)
                session["erreur_typeSpanish"] += [False]

        if session["reponseUserSpanish"] is not True:

            session["erreur_timeSpanish"] += [session["timeSpanish"]]
            session["erreur_verbSpanish"] += [session["verbSpanish"]]
            session["erreur_pronounsSpanish"] += [session["pronounsSpanish"]]

            if not ("compteurSpanish" in session):
                session["compteurSpanish"] = 0

    verb_type = request.form.get("drone")

    if request.form.get("continue") is not None or verb_type is not None:

        session["reponseUserSpanish"] = ""
        session["reponseVerbSpanish"] = ""

        if verb_type == "tous" or (
                verb_type != "reguliers" and verb_type != "irreguliers" and "tousSpanish" in session and session[
            "tousSpanish"] is True):

            aleatoire = random.randint(0, 1)
            session["kiwi2Spanish"] = "checked"
            session["kiwi3Spanish"] = None
            session["kiwiSpanish"] = None

            if aleatoire == 0:
                session["verbSpanish"] = csvReaderIrregularSpanish.verbChoice()
                session["irregularSpanish"] = True
                session["tousSpanish"] = True

            else:
                session["verbSpanish"] = csvReaderSpanish.verbChoice()
                session["tousSpanish"] = True
                session["irregularSpanish"] = False

        elif verb_type == "irreguliers" or (
                verb_type != "reguliers" and "irregularSpanish" in session and session["irregularSpanish"] is True):

            session["kiwi3Spanish"] = "checked"
            session["kiwiSpanish"] = None
            session["kiwi2Spanish"] = None
            session["verbSpanish"] = csvReaderIrregularSpanish.verbChoice()
            session["irregularSpanish"] = True
            session["tousSpanish"] = False

        else:

            session["kiwiSpanish"] = "checked"
            session["kiwi2Spanish"] = None
            session["kiwi3Spanish"] = None
            session["verbSpanish"] = csvReaderSpanish.verbChoice()
            session["tousSpanish"] = False
            session["irregularSpanish"] = False

        if "compteurSpanish" in session and session["compteurSpanish"] == 2:

            session["timeSpanish"] = session["erreur_timeSpanish"][0]
            session["pronounsSpanish"] = session["erreur_pronounsSpanish"][0]
            session["verbSpanish"] = session["erreur_verbSpanish"][0]
            session["irregularSpanish"] = session["erreur_typeSpanish"][0]
            session["erreur_timeSpanish"].pop(0)
            session["erreur_pronounsSpanish"].pop(0)
            session["erreur_verbSpanish"].pop(0)
            session["erreur_typeSpanish"].pop(0)
            session.pop("compteurSpanish")
            rappel = "Tu as fait une erreur récemment sur ce verbe, conjugue le à nouveau !"

        else:
            session["timeSpanish"] = random.choice(session["listActiveTimesSpanish"])
            session["pronounsSpanish"] = random.choice(listPronounsSpanish)

        if "compteurSpanish" in session:
            session["compteurSpanish"] += 1

    return {
        "time": session["timeSpanish"],
        "pronouns": session["pronounsSpanish"],
        "verb": session["verbSpanish"],
        "reponseUser": session["reponseUserSpanish"],
        "reponseVerb": session["reponseVerbSpanish"],
        "banane": session["bananeSpanish"],
        "banane2": session["banane2Spanish"],
        "banane3": session["banane3Spanish"],
        "banane4": session["banane4Spanish"],
        "banane5": session["banane5Spanish"],
        "banane6": session["banane6Spanish"],
        "banane7": session["banane7Spanish"],
        "kiwi": session["kiwiSpanish"],
        "kiwi2": session["kiwi2Spanish"],
        "kiwi3": session["kiwi3Spanish"],
        "username": session["username"],
        "rappel": rappel,
    }


@app.route("/connexion", methods=['GET', 'POST'])
def connexion():
    """fonction qui renvoie la page de connexion et de création de compte du site"""

    before_request()

    return {
        "username": session["username"],
    }


@app.route("/signup", methods=['GET', 'POST'])
def signup():
    """fonction qui traite la création de compte en vérifiant un compte avec cette adresse email n'existe pas déjà:
    si existe renvoie à la page de connexion sinon envoie a la page d'acceuil du site"""

    before_request()

    user = models.User.query.all()

    email = request.form.get("email")
    usernameBase = request.form.get("username").lower()
    username = ""
    for chr in usernameBase:
        if chr != " " and (
                ord(chr) == 45 or ord(chr) == 46 or 48 <= ord(chr) <= 57 or ord(chr) == 95 or 97 <= ord(chr) <= 122):
            username += chr

    for val in user:
        if email == val.email:
            return {
                "retour": "falseEmail"
            }
        if username == val.username:
            return {
                "retour": "falseUsername"
            }

    firstname = request.form.get("firstname")
    lastname = request.form.get("lastname")
    mailtoken = secrets.token_hex(12)

    # mail(email, "mailverif.html", firstname, lastname, username, mailtoken)
    password = hashing.hash_value(request.form.get("password"), salt='abcd')
    etablissement = request.form.get("etablissement")
    date_creation = models.datetime.now().strftime('%d/%m/%Y')
    logo = "https://cdn.discordapp.com/attachments/1098726716798673016/1099109424590757929/mexicain.png"
    models.addUser(email, False, mailtoken, firstname, lastname, username, password, etablissement, 0, "0",
                   date_creation, logo, 1, 0, 0, 0)
    session["username"] = username
    flash("Bienvenue et bonne conjugaison")

    return {
        "retour": "trueCreation"
    }


@app.route("/signin", methods=['GET', 'POST'])
def signin():
    """fonction qui traite la connexion à un compte existant: si il existe l'envoie vers la page d'acceuil connecter
    sinon le renvoie à la page de connexion"""

    before_request()

    user = models.User.query.all()
    for val in user:
        if request.form.get("email") == val.email and hashing.check_value(val.password, request.form.get("password"),
                                                                          salt='abcd'):
            session["username"] = val.username
            return {
                "retour": "trueConnect"
            }


        elif request.form.get("email") == val.email:
            return {
                "retour": "falseAuth"
            }

    return {
        "retour": "falseAuth"
    }


@app.route("/logout", methods=['GET', 'POST'])
def logout():
    """fonction permettant de ce déconnecter de son compte """

    before_request()

    session["username"] = "Connexion"

    return {
        "redirect": "true"
    }


@app.route("/profile/<username>", methods=['GET', 'POST'])
def username_route(username):
    """fonction qui renvoie la page de profil de l'utilisateur rechercher"""

    before_request()
    models.modifyClassement(classements())

    user = models.User.query.all()

    for val in user:
        if val.username == username:
            date_creation = val.date_creation
            xp = val.xp
            etablissement = val.etablissement
            level = val.level
            day_streak = val.day_streak
            logo = val.logo
            classement = val.classement

            return {
                "date_creation": date_creation,
                "xp": xp,
                "etablissement": etablissement,
                "day_streak": day_streak,
                "logo": logo,
                "username2": username,
                "level": level,
                "classement": classement,
                "classementJoueurs": classements(),
                "username": session["username"],
            }

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

    return {
        "username": session["username"],
        "utilisateurs": utilisateurs(),
    }


@app.route("/leaderboard", methods=['GET', 'POST'])
def leaderboard():
    """fonction qui renvoie la page de classement.jsx du site"""

    before_request()

    return {
        "username": session["username"],
        "utilisateurs": utilisateurs(),
        "classementPlayers": classements(),
        "classementWeek": classement_week(),
        "classementMonth": classement_month(),
    }


@app.route("/verif/<username>/<mailtoken>", methods=['GET', 'POST'])
def verif(mailtoken, username):
    if models.verif(mailtoken, username) is True:
        flash("Compte vérifier")

        return redirect(url_for("home"))

    flash("une erreur est survenu")
    return redirect(url_for("home"))


@app.route("/forgetpassword/<username>/<mailtoken>", methods=['GET', 'POST'])
def passwordForget(username, mailtoken):
    password = request.form.get("password")

    if password is not None:

        password = hashing.hash_value(password, salt='abcd')

        if models.changePassword(mailtoken, username, password) is True:
            flash("Changement de mot de passe effectué")

            return redirect(url_for("home"))

        flash("une erreur est survenu")
        return redirect(url_for("home"))

    return render_template("forgetPassword.html")


@app.route("/forgetpassword", methods=['GET', 'POST'])
def sendMailPassword():
    username = session["username"]
    mailtoken = secrets.token_hex(12)

    fistLastName = addtoken(mailtoken, username)

    firstname = fistLastName[0]
    lastname = fistLastName[1]
    mail = fistLastName[2]

    mail(mail, "mailforgetpassword.html", firstname, lastname, username, mailtoken)
