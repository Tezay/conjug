const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
var form3 = document.getElementById("inscription");

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

form3.addEventListener("submit", function(e){

    var mdp = document.getElementById("password").value;

    if( mdp.length < 6){
      e.preventDefault();
      alert("Mot de passe trop court (minimun 6 caractères");
      return false;
    } else if (!(mdp.match( /[0-9]/g) && mdp.match( /[A-Z]/g) && mdp.match(/[a-z]/g) && mdp.match( /[^a-zA-Z\d]/g))){
        e.preventDefault();
      alert("Votre mot de passe doit contenir au moins un caractère une majuscule et un carctère spécial");
      return false;
    };

});

