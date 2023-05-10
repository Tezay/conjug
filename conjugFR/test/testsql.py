from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy.orm

app = Flask("Application")
# On configure la base de données
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3306/test_database'

engine = sqlalchemy.create_engine("mysql+pymysql://root:root@localhost:3306/test_database", echo=True)
# On initie l'extension
db = SQLAlchemy(app)
# On copiera ensuite le modèle de données :

Base = sqlalchemy.orm.declarative_base()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(length=100), nullable=False)
    # firstname = Column(String(length=100), nullable=False)
    # lastname = Column(String(length=100), nullable=False)
    # username = Column(String(length=100), nullable=False)
    # password = Column(String(length=100), nullable=False)
    # etablissement = Column(String(length=100))
    db.UniqueConstraint('email')  # 'username', name='uix_1')


# Puis on récupère les données au moment de l'exécution des routes :

Base.metadata.create_all(engine)

Session = sqlalchemy.orm.sessionmaker()
Session.configure(bind=engine)
session = Session()


@app.route("/")
def accueil():
    # On a bien sûr aussi modifié le template pour refléter le changement
    lieux = User.query.all()
    print(lieux)
    for user in lieux:
        print(user.email)
    return "banane"


if __name__ == "__main__":
    # with app.app_context():
    #     db.drop_all()
    #     db.create_all()
    app.run(debug=True, use_evalex=False)
