from Backend import db
from Backend.Models import User, Leaderboard

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