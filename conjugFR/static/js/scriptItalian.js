var form = document.getElementById("initialisation");
var form2 = document.getElementById("actualisation");

form.addEventListener("submit", function(e){

  var checkBox1 = document.getElementById("1");
  var checkBox2 = document.getElementById("2");
  var checkBox3 = document.getElementById("3");
  var checkBox4 = document.getElementById("4");
  var checkBox5 = document.getElementById("5");

  var tous = document.getElementById("tous");
  var irregulier = document.getElementById("irreguliers");
  var regulier = document.getElementById("reguliers");

  if (checkBox1.checked == false && checkBox2.checked == false && checkBox3.checked == false && checkBox4.checked == false && checkBox5.checked == false){
    e.preventDefault();
    alert("Choisir et valider un ou plusieurs temps");
    return false;

  } else if (tous.checked == false && irregulier.checked == false && regulier.checked == false){
        e.preventDefault();
    alert("Choisir les verbes réguliers, irréguliers ou tous");
    return false;
  }

});

function insertCharacter(lettre){

  document.getElementById("response").value += lettre;

};