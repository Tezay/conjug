from Backend import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(length=100), unique=True, nullable=False)
    firstname = db.Column(db.String(length=100), nullable=False)
    lastname = db.Column(db.String(length=100), nullable=False)
    username = db.Column(db.String(150), unique=True, nullable=False)
    institution=db.Column(db.String(length=100))
    date_creation = db.Column(db.DateTime, nullable=False)
    logo=db.Column(db.String(length=100), nullable=False)
    password = db.Column(db.String(length=100), nullable=False)
    day_streak = db.Column(db.Integer, nullable=False)