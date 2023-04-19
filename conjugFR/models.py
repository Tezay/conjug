from flask_sqlalchemy import SQLAlchemy
import sqlalchemy.orm
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

from config import engine
from conjugFR.views import app

db = SQLAlchemy(app)

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(length=100), nullable=False)
    firstname = Column(String(length=100), nullable=False)
    lastname = Column(String(length=100), nullable=False)
    username = Column(String(length=100), nullable=False)
    password = Column(String(length=100), nullable=False)
    etablissement = Column(String(length=100))


Base.metadata.create_all(engine)

Session = sqlalchemy.orm.sessionmaker()
Session.configure(bind=engine)
session = Session()


def addUser(email, firstname, lastname, username, password, etablissement):
    newUser = User(email=email, firstname=firstname, lastname=lastname, username=username,
                   password=username, etablissement=etablissement)
    session.add(newUser)
    session.commit()

