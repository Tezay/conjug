from conjugFR.models import app, db

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, use_evalex=False)
