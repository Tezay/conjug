from Backend.Models import User

def utilisateurs():

    return {
        user.username: user.logo
        for user in User.query.filter(User.username != "test").all()
    }



