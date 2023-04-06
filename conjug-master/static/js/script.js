var form = document.getElementById("initialisation");
var form2 = document.getElementById("actualisation");
var button1 = document.getElementById("a")
var button2 = document.getElementById("i")
var button3 = document.getElementById("o")
var button4 = document.getElementById("u")
var button5 = document.getElementById("n")

form.addEventListener("submit", function(e){

  var checkBox1 = document.getElementById("1");
  var checkBox2 = document.getElementById("2");
  var checkBox3 = document.getElementById("3");
  var checkBox4 = document.getElementById("4");
  var checkBox5 = document.getElementById("5");
  var checkBox6 = document.getElementById("6");
  var checkBox7 = document.getElementById("7");
    
  if (checkBox1.checked == false && checkBox2.checked == false && checkBox3.checked == false && checkBox4.checked == false && checkBox5.checked == false && checkBox6.checked == false && checkBox7.checked == false){
    e.preventDefault();
    alert("Choisir et valider un ou plusieurs temps");
    return false;
  } else {
    return true;
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

button1.addEventListener("onclick", function(e){
    
  var zoneDeTexte = document.getElementById("reponse");
  
  zoneDeTexte = zoneDeTexte.valu + "á";
  
});

button2.addEventListener("onclick", function(e){
    
  var zoneDeTexte = document.getElementById("reponse");
  
  zoneDeTexte = zoneDeTexte.valu + "í";
  
});

button3.addEventListener("onclick", function(e){
    
  var zoneDeTexte = document.getElementById("reponse");
  
  zoneDeTexte = zoneDeTexte.valu + "ó";
  
});

button4.addEventListener("onclick", function(e){
    
  var zoneDeTexte = document.getElementById("reponse");
  
  zoneDeTexte = zoneDeTexte.valu + "ú";
  
});

button5.addEventListener("onclick", function(e){
    
  var zoneDeTexte = document.getElementById("reponse");
  
  zoneDeTexte = zoneDeTexte.valu + "ñ";
  
});
  
