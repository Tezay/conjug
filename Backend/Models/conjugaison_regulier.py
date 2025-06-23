from Backend import db

class Conjugaison_regulier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(length=3), nullable=False)
    tense = db.Column(db.String(length=100), nullable=False)
    verb_group = db.Column(db.String(length=10), nullable=False)
    prem_pers_sing = db.Column(db.String(length=20), nullable=False)
    deux_pers_sing = db.Column(db.String(length=20), nullable=False)
    trois_pers_sing = db.Column(db.String(length=20), nullable=False)
    prem_pers_plur = db.Column(db.String(length=20), nullable=False)
    deux_pers_plur = db.Column(db.String(length=20), nullable=False)
    trois_pers_plur = db.Column(db.String(length=20), nullable=False)
