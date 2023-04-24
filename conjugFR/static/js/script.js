var form = document.getElementById("initialisation");
var form2 = document.getElementById("actualisation");

form.addEventListener("submit", function(e){

  var checkBox1 = document.getElementById("1");
  var checkBox2 = document.getElementById("2");
  var checkBox3 = document.getElementById("3");
  var checkBox4 = document.getElementById("4");
  var checkBox5 = document.getElementById("5");
  var checkBox6 = document.getElementById("6");
  var checkBox7 = document.getElementById("7");

  var tous = document.getElementById("tous");
  var irregulier = document.getElementById("irreguliers");
  var regulier = document.getElementById("reguliers");

  if (checkBox1.checked == false && checkBox2.checked == false && checkBox3.checked == false && checkBox4.checked == false && checkBox5.checked == false && checkBox6.checked == false && checkBox7.checked == false){
    e.preventDefault();
    alert("Choisir et valider un ou plusieurs temps");
    return false;

  } else if (tous.checked == false && irregulier.checked == false && regulier.checked == false){
        e.preventDefault();
    alert("Choisir les verbes réguliers, irréguliers ou tous");
    return false;
  }
    
});

 
form2.addEventListener("submit", function(e){
    
  var zoneDeTexte = document.getElementById("reponse");
  var verb = document.getElementById("verbe").textContent;

  if(zoneDeTexte.value == '' || zoneDeTexte.value == null){
    e.preventDefault();
    alert("Entrer un verbe conjugué");
    return false;
  } else if(verb == "verbe") {
    alert("Choisir et valider un ou plusieurs temps");
    return false;  
  } else {
    return true;

  }
  
});


function insertCharacter(lettre){
  
  document.getElementById("reponse").value += lettre;
  
};


function openNav() {
  document.getElementById("menu").classList.add("active");
};

function closeNav() {
  document.getElementById("menu").classList.remove("active");
};

function toggleNav() {
  var menu = document.getElementById("menu");
  if (menu.classList.contains("active")) {
    closeNav();
  } else {
    openNav();
  }
};

