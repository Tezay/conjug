from Backend.Models import User, Leaderboard
from Backend import db
from datetime import datetime, timedelta

### User + LeaderBoard ###
def add_user(informations):
    new_user = User(email=informations['email'], firstname=informations['firstname'], lastname=informations['lastname'],
                    username=informations['username'], institution=informations['institution'], date_creation=informations['date_creation'],
                    logo=informations['logo'], password=informations['password'], day_streak=informations['day_streak'])
    db.session.add(new_user)
    db.session.commit()

def add_xp(informations):
    user = User.query.filter_by(username=informations['username']).first()
    leaderboard_entry = user.leaderboard_entry

    if not leaderboard_entry:
        leaderboard_entry = Leaderboard(
            user_id=user.id,
            level="Débutant",
            xp=0,
            xp_week=0,
            xp_month=0,
            classement=0
        )
        db.session.add(leaderboard_entry)

    leaderboard_entry.xp += informations['xp']
    leaderboard_entry.xp_week += informations['xp']
    leaderboard_entry.xp_month += informations['xp']

    db.session.commit()
    update_leaderboard()

def update_leaderboard():
    # On récupère tous les utilisateurs triés par xp décroissant
    leaderboard_entries = Leaderboard.query.order_by(Leaderboard.xp.desc()).all()

    # On parcourt et on assigne le classement
    for rank, entry in enumerate(leaderboard_entries, start=1):
        entry.rank = rank

    db.session.commit()


### Authentification ###

def add_token(informations):
    user = User.query.filter_by(username=informations['username']).fisrt()
    authv_entry = user.authv_entry

    authv_entry.token = informations['token']
    authv_entry.token_created_at = datetime.utcnow()

    db.session.commit()

    return (user.firstname, user.lastname, user.email)

def change_password(informations):
    user = User.query.filter_by(username=informations['username']).fisrt()
    authv_entry = user.authv_entry
    if authv_entry.token == informations['token'] and authv_entry.token_created_at + timedelta(minutes=30) <= datetime.now():
        user.password = informations['password']
        db.session.commit()
        return True

    return False

def email_verif(informations):
    user = User.query.filter_by(username=informations['username']).fisrt()
    authv_entry = user.authv_entry

    if authv_entry.token == informations['token']:
        user.verif = True
        db.session.commit()
        return True

    return False

