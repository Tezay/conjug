from conjugFR.views import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://dbadmin:password@localhost:3306/conjugDB'
app.config['SECRET_KEY'] = "random string"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

SECRET_KEY = ''
