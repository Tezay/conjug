import secrets
import codecs
from datetime import datetime, timedelta
from email.message import EmailMessage

from Backend import db
from Backend.Models import User

### Connexion ###

def create_user(informations):
    date_creation = datetime.now().strftime('%d/%m/%Y')
    logo = "/static/media/mexicain.a7c4569edfe66c602692.png"
    new_user = User(email=informations['email'], first_name=informations['first_name'], last_name=informations['last_name'],
                    username=informations['username'], institution=informations['institution'], date_creation=date_creation,
                    logo=logo, password=informations['password'], day_streak=informations['day_streak'])
    db.session.add(new_user)
    db.session.commit()
    return new_user

def verify_signup(informations):
    username_verif = ""
    for chr in informations['username']:
        if chr != " " and (
                ord(chr) == 45 or ord(chr) == 46 or 48 <= ord(chr) <= 57 or ord(chr) == 95 or 97 <= ord(
            chr) <= 122):
            username_verif += chr

    if User.query.filter_by(username=informations['username']).first():
        return False, "false username"
    if User.query.filter_by(email=informations['email']).first():
        return False, "false email"

    return  True, username_verif

def verify_login(informations):
    user = User.query.filter_by(email=informations['email']).first()
    if user and user.password == informations['password']:
        return True, user

    return False, None


### Verification de l'utilisateur ###

def add_token(informations):
    user = User.query.filter_by(email=informations['email']).fisrt()
    authv_entry = user.authv_entry

    token = secrets.token_hex(12)
    authv_entry.token = token
    authv_entry.token_created_at = datetime.now()

    db.session.commit()

    return user, token

def change_password(informations):
    user = User.query.filter_by(username=informations['username']).fisrt()
    authv_entry = user.authv_entry
    if authv_entry.token == informations['token'] and authv_entry.token_created_at + timedelta(minutes=30) <= datetime.now():
        user.password = informations['password']
        db.session.commit()
        return True

    return False

def verify_email(informations):
    user = User.query.filter_by(username=informations['username']).fisrt()
    authv_entry = user.authv_entry

    if authv_entry.token == informations['token'] and authv_entry.token_created_at + timedelta(minutes=30) <= datetime.now():
        user.verif = True
        db.session.commit()
        return True

    return False


### Send Mail ###

def mail(email, type, object1, object2, object3, object4):
    # from config import server

    msg = EmailMessage()
    msg['Subject'] = "conjug.fr"
    msg['From'] = "contact@conjug.fr"
    msg['To'] = email

    with codecs.open('conjugFR/templates/' + type, 'r', encoding='utf-8') as f:
        mail = f.read()
        mail = mail.format(prenom=object1, nom=object2, username=object3, token=object4)

    msg.set_content(mail, subtype='html', charset='utf-8')