from flask import Flask, render_template, request, session, redirect
from flask_hashing import Hashing
import random
from . import csvReader
from . import csvReaderIrregular
from . import models
from .utils import listPronouns, correspondanceTime, correspondanceTimeIrregular, correspondanceVerb, \
    correspondanceTermination

app = Flask(__name__)
app.config.from_object('config')
hashing = Hashing(app)


# Home page

@app.route("/", methods=['GET', 'POST'])
def home():
    if not ("username" in session):
        session["username"] = "Connexion"

    return render_template("home.html",
                           username=session["username"])


# German page

@app.route("/de", methods=['GET', 'POST'])
def de():
    return render_template("language/german.html",
                           username=session["username"])


# Italian page

@app.route("/it", methods=['GET', 'POST'])
def it():
    return render_template("language/italian.html",
                           username=session["username"])


# Spanish page

@app.route("/es", methods=['GET', 'POST'])
def es():
    reponseUser = ""

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

    verif = request.form.get("temps[]")

    if verif == "Futuro" or verif == "Conditional" or verif == "Presente de indicativo" or verif == "Presente de subjonctivo" or verif == "Pretérito imperfecto de indicativo" or verif == "Pretérito indefinido" or verif == "Prétero imperfecto de subjonctivo":

        session["listActiveTimes"] = request.form.getlist("temps[]")
        session["time"] = random.choice(session["listActiveTimes"])
        session["pronouns"] = random.choice(listPronouns)

        if "Futuro" in session["listActiveTimes"]:
            session["banane"] = "checked"
        else:
            session["banane"] = None
        if "Conditional" in session["listActiveTimes"]:
            session["banane2"] = "checked"
        else:
            session["banane2"] = None
        if "Presente de indicativo" in session["listActiveTimes"]:
            session["banane3"] = "checked"
        else:
            session["banane3"] = None
        if "Presente de subjonctivo" in session["listActiveTimes"]:
            session["banane4"] = "checked"
        else:
            session["banane4"] = None
        if "Pretérito imperfecto de indicativo" in session["listActiveTimes"]:
            session["banane5"] = "checked"
        else:
            session["banane5"] = None
        if "Pretérito indefinido" in session["listActiveTimes"]:
            session["banane6"] = "checked"
        else:
            session["banane6"] = None
        if "Prétero imperfecto de subjonctivo" in session["listActiveTimes"]:
            session["banane7"] = "checked"
        else:
            session["banane7"] = None

    if request.form.get("drone") == "irreguliers":

        session["kiwi3"] = "checked"
        session["kiwi"] = None
        session["kiwi2"] = None
        session["verb"] = csvReaderIrregular.verbChoice()
        session["irregular"] = 6


    elif request.form.get("drone") == "tous":

        aleatoire = random.randint(0, 1)
        session["kiwi2"] = "checked"
        session["kiwi3"] = None
        session["kiwi"] = None

        if aleatoire == 0:
            session["verb"] = csvReaderIrregular.verbChoice()
            session["irregular"] = 6
            session["tous"] = 7

        else:
            session["verb"] = csvReader.verbChoice()
            session["irregular"] = 8
            session["tous"] = 7

    elif request.form.get("drone") == "reguliers":

        session["kiwi"] = "checked"
        session["kiwi2"] = None
        session["kiwi3"] = None
        session["verb"] = csvReader.verbChoice()
        session["irregular"] = 8

    if request.form.get("reponse") is not None and len(request.form.get("reponse")) >= 0 and session["verb"] != "verbe":

        reponse = request.form.getlist("reponse")
        reponseVerb = reponse[0].lower()

        if session["irregular"] == 6:

            correction = correspondanceTimeIrregular[session["time"]]()[listPronouns.index(session['pronouns'])][
                correspondanceVerb.index(session["verb"])]

            if reponseVerb == correction:
                reponseUser = "✅ Bonne réponse !"

            else:

                reponseUser = "❌ La réponse était: " + str(correction)

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

            elif (session["time"] == "Futuro" or session["time"] == "Conditional") and reponseVerb != session[
                "verb"] + correction:

                reponseUser = "❌ La réponse était: " + str(session["verb"] + correction)

            else:

                reponseUser = "❌ La réponse était: " + str(session["verb"][:-2] + correction)

            session["verb"] = csvReader.verbChoice()

        if "tous" in session and session["tous"] == 7:

            aleatoire = random.randint(0, 1)
            if aleatoire == 0:
                session["verb"] = csvReaderIrregular.verbChoice()
                session["irregular"] = 6

            else:
                session["verb"] = csvReader.verbChoice()
                session["irregular"] = 8

        session["time"] = random.choice(session["listActiveTimes"])
        session["pronouns"] = random.choice(listPronouns)

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
                           username=session["username"])


@app.route("/connexion", methods=['GET', 'POST'])
def connexion():
    if not ("username" in session):
        session["username"] = "Connexion"

    return render_template("login.html",
                           username=session["username"])


@app.route("/signup", methods=['GET', 'POST'])
def signup():
    user = models.User.query.all()
    print(user)
    for val in user:
        if request.form.get("email") == val.email or request.form.get("username") == val.username:
            return redirect("/connexion")

    email = request.form.get("email")
    firstname = request.form.get("firstname")
    lastname = request.form.get("lastname")
    username = request.form.get("username")
    password = hashing.hash_value(request.form.get("password"), salt='abcd')
    etablissement = request.form.get("etablissement")
    models.addUser(email, firstname, lastname, username, password, etablissement)

    return redirect("/")


@app.route("/signin", methods=['GET', 'POST'])
def signin():
    user = models.User.query.all()
    for val in user:
        if request.form.get("email") == val.email and hashing.check_value(val.password, request.form.get("password"),
                                                                          salt='abcd'):
            session["username"] = val.username
            return redirect("/")

    return redirect("/connexion")


@app.route("/logout", methods=['GET', 'POST'])
def logout():
    return redirect("/")

@app.route("/profile", methods=['GET', 'POST'])
def profile():
    return render_template("heritage_template/profile.html", username=session["username"])
