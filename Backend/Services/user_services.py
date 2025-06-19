from Backend.Models.user import User
from Backend.database import db
from werkzeug.security import generate_password_hash, check_password_hash

def create_user(username, password):
    hashed = generate_password_hash(password)
    user = User(username=username, password=hashed)
    db.session.add(user)
    db.session.commit()
    return user

def verify_user(username, password):
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return user
    return None