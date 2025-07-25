from Backend import db

class Conjugaison_verbe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(length=3), nullable=False)
    verb_type = db.Column(db.String(length=100), nullable=False)
    verb = db.Column(db.String(length=100), nullable=False)

