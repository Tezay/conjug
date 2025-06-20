from Backend import db

class AuthV(db.Model):
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    verif = db.Column(db.Boolean, nullable=False)
    token = db.Column(db.String(length=24))
    token_created_at = db.Column(db.DateTime)

    user = db.relationship('User', backref=db.backref('authv_entry', uselist=False))