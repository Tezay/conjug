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
    var username = document.getElementById("username").value;

    if( mdp.length < 6){
      e.preventDefault();
      alert("Mot de passe trop court (minimun 6 caractères");
      return false;
    } else if (!(mdp.match( /[0-9]/g) && mdp.match( /[A-Z]/g) && mdp.match( /[a-z]/g) && mdp.match(/[!-/:-@[-`{-~]/g))){
      e.preventDefault();
      alert("Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un carctère spécial");
      return false;
    };

    if(username.match( /[^-.0-9_a-z]/g) || username.match( /[ \t\n\x0B\f\r]/g) || len(username) < 3 || len(username) > 15){
      e.preventDefault();
      alert("Votre nom d'utilisateur doit faire minimun 3 caractères, maximum 15 caractères et ne doit pas contenir d'espace ou de caractères non conformes");
      return false;
    };

});


