from backend import db
from backend.models import User, Leaderboard

def add_xp(informations):
    user = User.query.filter_by(username=informations['username']).first()
    leaderboard_entry = user.leaderboard_entry

    if not leaderboard_entry:
        leaderboard_entry = Leaderboard(
            user_id=user.id,
            level="Débutant",
            xp=informations['xp'],
            xp_week=informations['xp'],
            xp_month=informations['xp'],
            rank=0
        )
        db.session.add(leaderboard_entry)
    else:
        leaderboard_entry.xp += informations['xp']
        leaderboard_entry.xp_week += informations['xp']
        leaderboard_entry.xp_month += informations['xp']

    db.session.commit()
    #classement_joueur()
    #classement_semaine()
    #classement_mois()

def classement_joueur():
    leaderboard_entries = Leaderboard.query.filter(Leaderboard.xp>0).order_by(Leaderboard.xp.desc()).all()

    classement_joueur = {}

    for rank, entry  in enumerate(leaderboard_entries, start=1):
        entry.rank = rank
        classement_joueur[entry.user.username] = rank

    return classement_joueur

def classement_semaine():
    leaderboard_entries = Leaderboard.query.filter(Leaderboard.xp_week>0).order_by(Leaderboard.xp_week.desc()).all()

    classement_semaine = {}

    for rank, entry  in enumerate(leaderboard_entries, start=1):
        entry.rank = rank
        classement_semaine[entry.user.username] = rank

    return classement_semaine

def classement_mois():
    leaderboard_entries = Leaderboard.query.filter(Leaderboard.xp_month>0).order_by(Leaderboard.xp_month.desc()).all()

    classement_mois = {}

    for rank, entry  in enumerate(leaderboard_entries, start=1):
        entry.rank = rank
        classement_mois[entry.user.username] = rank

    return classement_mois

def get_users_xp_data():
    """Récupère les données XP de tous les utilisateurs avec leaderboard"""
    leaderboard_entries = Leaderboard.query.filter(Leaderboard.xp > 0).all()
    
    users_xp = {}
    for entry in leaderboard_entries:
        users_xp[entry.user.username] = {
            'xp': entry.xp,
            'xp_week': entry.xp_week,
            'xp_month': entry.xp_month
        }
    
    return users_xp



