const MainLogin = ({handleSubmit}) => {

	const signUpButton = () => {
		const container = document.getElementById('login-container');
		container.classList.add("right-panel-active");
	};

	const signInButton = () => {
		const container = document.getElementById('login-container');
		container.classList.remove("right-panel-active");
	};

	const inscription = (e) => {
	
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

    if(username.match( /[^-.0-9A-Z_a-z]/g) || username.match( /[ \t\n\x0B\f\r]/g) || username.length < 3 || username.length > 15){
      e.preventDefault();
      alert("Votre nom d'utilisateur doit faire entre 3 et 15 caractères et ne peut contenir que des . _ - ,des chiffres, des lettres en minuscules et majuscules");
      return false;
    };
	};

   return (
      <>
                <div class="center">
				<div class="container" id="login-container">
					<div class="form-container sign-up-container">
						<form action="" method="post" name="signup" id="inscription" onSubmit={handleSubmit}>
							<h1>Créer un compte</h1>
							<div class="name">
								<input type="text" placeholder="Prénom" name="firstname" required/>
								<input type="text" placeholder="Nom" name="lastname" required/>
							</div>
							<input type="text" placeholder="Nom d'utilisateur" name="username" id="username" autocomplete="off" required/>
							<input type="text" placeholder="Nom de votre établissement (facultatif)" name="etablissement" />
							<input type="email" placeholder="Email" name="email" required/>
							<input type="password" placeholder="Mot de passe" name="password" id="password" required/>
							<button id="signUp" type="submit" onCLick={inscription}>S'inscrire</button>
						</form>
					</div>
					<div class="form-container sign-in-container">
						<form action="" method="post" name="signin" onSubmit={handleSubmit}>
							<h1>Se connecter</h1>
							<input type="email" placeholder="Email" name="email" required/>
							<input type="password" placeholder="Mot de passe" name="password" required/>
							<a class="contact-link" href="https://github.com/Tezay/conjug/issues" target="blank">Un problème ? Nous contacter</a>
							<button id="signIn" type="submit">Connexion</button>
						</form>
					</div>
					<div class="overlay-container">
						<div class="overlay">
							<div class="overlay-panel overlay-left">
								<h1>Déjà un compte ?</h1>
								<p>Connectez-vous à conjug.fr avec votre adresse email</p>
								<button class="ghost" id="signIn" onClick={signInButton}>Se connecter</button>
							</div>
							<div class="overlay-panel overlay-right">
								<h1>Pas encore de compte ?</h1>
								<p>Créez un compte dès maintenant pour enregistrer vos statistiques !</p>
								<button class="ghost" id="signUp" onClick={signUpButton}>S'inscrire</button>
							</div>
						</div>
					</div>
				</div>
				</div>
       </>
    )
};

export default MainLogin;


