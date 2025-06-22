from Backend import db

class Conjugaison_irregulier(db.Model):
    language = db.Column(db.String(length=3), unique = True, nullable=False)
    infinitif = db.Column(db.String(length=100), nullable=False)
    tense = db.Column(db.String(length=100), nullable=False)
    prem_pers_sing = db.Column(db.String(length=10), nullable=False)
    deux_pers_sing = db.Column(db.String(length=10), nullable=False)
    trois_pers_sing = db.Column(db.String(length=10), nullable=False)
    prem_pers_plur = db.Column(db.String(length=10), nullable=False)
    deux_pers_plur = db.Column(db.String(length=10), nullable=False)
    trois_pers_plur = db.Column(db.String(length=10), nullable=False)
