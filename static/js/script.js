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
    
  if (checkBox1.checked == false && checkBox2.checked == false && checkBox3.checked == false && checkBox4.checked == false && checkBox5.checked == false && checkBox6.checked == false && checkBox7.checked == false){
    e.preventDefault;
    alert("Veuillez choisir un/des temp(s) et le(s) validés");
    return false;
  } else {
    return true;
  }

});
 
form2.addEventListener("submit", function(e){
    
  var zoneDeTexte = document.getElementById("reponse").value;
  var verb = document.getElementByID("verbe");

  if(zoneDeTexte == ''){
    e.preventDefault;
    alert("Entrer un verbe conjugué");
    return false;
  } else if(verb != "verbe") {
    e.preventDefault;
    alert("Veuillez choisir un/des temp(s) et le(s) validés");
    return false;  
  } else {
    return true;
  }
});
