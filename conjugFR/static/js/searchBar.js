function searchUsername() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let userBox = document.getElementsByClassName('userBox');
      
    for (i = 0; i < userBox.length; i++) { 
        if (!userBox[i].innerHTML.toLowerCase().includes(input)) {
            userBox[i].style.display="none";
        }
        else {
            userBox[i].style.display="flex";
        }
    }
}

// On récupère les éléments des onglets
const tabs = document.querySelectorAll('.leaderboard-tab');
// On leur ajoute un écouteur d'événement au clic
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // On récupère l'identifiant de la tab cliquée
    const tabId = tab.dataset.tab;
    // On cache tous les contenus de leaderboard
    document.querySelectorAll('.leaderboard-content').forEach(content => {
      content.classList.remove('active-content');
    });
    // On affiche le contenu du leaderboard correspondant
    document.getElementById(tabId).classList.add('active-content');
    // On désactive toutes les tabs
    tabs.forEach(tab => {
      tab.classList.remove('active-tab');
    });
    // On active la tab cliquée
    tab.classList.add('active-tab');
  });
});
