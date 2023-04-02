from flask import Flask, render_template, url_for, request, session #test
import random
import csvReader

app = Flask(__name__)
app.secret_key = '4e074c033785b0ec6cc2ce3a7b4efc1a2796090ac4de3f9eb123af0adafb7387'

@app.route("/", methods=['GET', 'POST'])
def index():

    session["time"] = "temps"
    session["pronouns"] = "pronoms"
    session["verb"] = 'verbe'

    return render_template("index.html", time=session["time"], pronouns=session["pronouns"], verb=session["verb"])
@app.route("/exercice", methods=['GET', 'POST'])
def exercice():

    listPronouns = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"]

    correspondanceTime = {
        "Conditional": csvReader.Conditional,
        "Futuro": csvReader.Futuro,
        "Presente de indicativo": csvReader.Presente_de_indicativo,
        "Presente de subjonctivo": csvReader.Presente_de_subjonctivo,
        "Pretérito imperfecto de indicativo": csvReader.Preterito_imperfecto_de_indicativo,
        "Pretérito indefinido": csvReader.Preterito_indefinido,
        "Prétero imperfecto de subjonctivo": csvReader.Pretero_imperfecto_de_subjonctivo,
    }

    reponseUser=""

    if request.method == "POST":
        if request.form.get("temps[]") == None:
            pass

        else:
            session["listActiveTimes"] = request.form.getlist("temps[]")
            session["time"] = random.choice(session["listActiveTimes"])
            session["pronouns"] = random.choice(listPronouns)
            session["verb"] = csvReader.verbChoice()

        if request.form.get("reponse") == None:
            pass

        else:
            reponse = request.form.getlist("reponse")
            termination = str(session["verb"][-2:])
            correspondanceTermination = ["ar", "er", "ir"]

            correction = correspondanceTime[session["time"]]()[listPronouns.index(session['pronouns'])][correspondanceTermination.index(termination)]
            print(session["verb"][:-2] + correction)
            print(reponse)
            if (reponse[0] == session["verb"][:-2] + correction and session["time"] != "Futuro" and session["time"] != "Conditional") or ((session["time"] == "Futuro" or session["time"] == "Conditional") and reponse[0]  == session["verb"] + correction):
                reponseUser = "✅ Bonne réponse !"

            elif (session["time"] == "Futuro" or session["time"] == "Conditional") and reponse[0]  != session["verb"] + correction:
                reponseUser = "❌ La réponse était: " + str(session["verb"] + correction)

            else:
                reponseUser = "❌ La réponse était: " + str(session["verb"][:-2] + correction)

            session["time"] = random.choice(session["listActiveTimes"])
            session["pronouns"] = random.choice(listPronouns)
            session["verb"] = csvReader.verbChoice()


    return render_template("index.html", time=session["time"], pronouns=session["pronouns"], verb=session["verb"], reponseUser= reponseUser, listActiveTimes = session["listActiveTimes"] )

if __name__ == "__main__":
    app.run(debug=True)
