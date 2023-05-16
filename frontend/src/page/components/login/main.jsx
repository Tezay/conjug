function signUpButton() {
	const container = document.getElementById('container');
	container.classList.add("right-panel-active");
};

function signInButton() {
	const container = document.getElementById('container');
	container.classList.remove("right-panel-active");
};

function inscription(e) {

    var mdp = document.getElementById("password").value;
    var username = document.getElementById("username").value;

    if( mdp.length < 6){
      e.preventDefault();
      alert("Mot de passe trop court (minimun 6 caractères");
      return false;
    } else if (!(mdp.match( /[0-9]/g) && mdp.match( /[A-Z]/g) && mdp.match( /[a-z]/g))){ //mdp.match(/[!-/:-@[-`{-~]/g)
      e.preventDefault();
      alert("Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre");
      return false;
    };

    if(username.match( /[^-.0-9_a-z]/g) || username.match( /[ \t\n\x0B\f\r]/g) || username.length < 3 || username.length > 15){
      e.preventDefault();
      alert("Votre nom d'utilisateur doit faire entre 3 et 15 caractères et ne peut contenir que des . _ - ,des chiffres et des lettres en minuscules");
      return false;
    };
};

const MainLogin = ({reload}) => {

    return (
        <>
			<div class="container" id="container">
				<div class="form-container sign-up-container">
					<form action="http://127.0.0.1:5000/signup" method="post" name="signup" id="inscription" onSubmit={inscription} onSubmit={reload}>
						<h1>Créer un compte</h1>
						<div class="name">
							<input type="text" placeholder="Prénom" name="firstname" required/>
							<input type="text" placeholder="Nom" name="lastname" required/>
						</div>
						<input type="text" placeholder="Nom d'utilisateur" name="username" id="username" autocomplete="off" required/>
						<input type="text" placeholder="Nom de votre établissement (facultatif)" name="etablissement" />
						<input type="email" placeholder="Email" name="email" required/>
						<input type="password" placeholder="Mot de passe" name="password" id="password" required/>
						<button type="submit">S'inscrire</button>
					</form>
				</div>
				<div class="form-container sign-in-container">
					<form action="http://127.0.0.1:5000/signin" method="post" name="signin">
						<h1>Se connecter</h1>
						<input type="email" placeholder="Email" name="email" required/>
						<input type="password" placeholder="Mot de passe" name="password" required/>
						<a class="contact-link" href="https://github.com/Tezay/conjug/issues" target="blank">Un problème ? Nous contacter</a>
						<button type="submit">Connexion</button>
					</form>
				</div>
				<div class="overlay-container">
					<div class="overlay">
						<div class="overlay-panel overlay-left">
							<h1>Déjà un compte ?</h1>
							<p>Connectez à conjug.fr avec votre adresse email</p>
							<button class="ghost" id="signIn" onClick={signInButton}>Se connecter</button>
						</div>
						<div class="overlay-panel overlay-right">
							<h1>Pas encore de compte ?</h1>
							<p>Créer un compte dès maintenant pour enregistrer vos statistiques !</p>
							<button class="ghost" id="signUp" onClick={signUpButton}>S'inscrire</button>
						</div>
					</div>
				</div>
			</div>
        </>
    )
};

export default MainLogin;


