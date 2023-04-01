window.addEventListener("load", function () {
  function sendData() {
    var XHR = new XMLHttpRequest();

    // Liez l'objet FormData et l'élément form
    var FD = new FormData(form)
    // Configurez la requête
    XHR.open("POST", "https://conjug.fr/");

    // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
    XHR.send(FD);
  }

  // Accédez à l'élément form …
  var form = document.getElementById("initialisation");
  var form2 = document.getElementById("actualisation");
  // … et prenez en charge l'événement submit.
  form.addEventListener("submit", function(e){

    sendData();
  });
 
  form2.addEventListener("submit", function(e){

   sendData();
  });
});

if (window.location.href.indexOf("/exercice") > -1) {
  document.querySelector(".exercice").style.display = "block";
}

if (window.location.href.indexOf("/exercice") > -1) {
  document.querySelector(".infos").style.display = "block";
}
