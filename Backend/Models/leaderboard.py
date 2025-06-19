from Backend import db

class Leaderboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique = True, nullable=False)
    level = db.Column(db.String(length=100), nullable=False)
    xp = db.Column(db.Integer, nullable=False)
    xp_week = db.Column(db.Integer, nullable=False)
    xp_month = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', backref=db.backref('leaderboard_entry', uselist=False))
