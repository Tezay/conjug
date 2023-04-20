from flask_sqlalchemy import SQLAlchemy
import sqlalchemy.orm

from config import engine
from conjugFR.views import app

db = SQLAlchemy(app)

Base = sqlalchemy.orm.declarative_base()


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(length=100), nullable=False)
    firstname = db.Column(db.String(length=100), nullable=False)
    lastname = db.Column(db.String(length=100), nullable=False)
    username = db.Column(db.String(length=100), nullable=False)
    password = db.Column(db.String(length=100), nullable=False)
    etablissement = db.Column(db.String(length=100))
    db.UniqueConstraint('email', 'username', name='uix_1')

    def __init__(self, email, firstname, lastname, username, password, etablissement):
        self.email = email
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.password = password
        self.etablissement = etablissement


Base.metadata.create_all(engine)

Session = sqlalchemy.orm.sessionmaker()
Session.configure(bind=engine)
session = Session()


def addUser(email, firstname, lastname, username, password, etablissement):
    newUser = User(
        email=email, firstname=firstname, lastname=lastname, username=username, password=password, etablissement=etablissement)
    session.add(newUser)
    session.commit()
