from conjugFR.models import app, db

if __name__ == "__main__":
    """lance l'application"""
    app.run(debug=True, use_evalex=False)