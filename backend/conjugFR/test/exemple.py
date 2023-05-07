error = None

if request.method == 'POST':
    old_password = request.form['old_password']
    new_password = request.form['new_password']
    confirm_password = request.form['confirm_password']

    user = models.User.query.filter_by(username=session["username"]).first()

    if not hashing.verify(user.password, old_password):
        error = 'Ancien mot de passe incorrect'
    elif new_password != confirm_password:
        error = 'Les deux mots de passe ne correspondent pas'
    else:
        user.password = hashing.hash(new_password)
        models.db.session.commit()
        return redirect('/')

return render_template('change_password.html',
                       error=error,
                       username=session["username"])