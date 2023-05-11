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


//Tabs

// Récupération des éléments du DOM
const monthTab = document.querySelector('.leaderboard-tab[data-tab="month"]');
const globalTab = document.querySelector('.leaderboard-tab[data-tab="global"]');
const monthContainer = document.querySelector('.month-leaderboard-container');
const globalContainer = document.querySelector('.global-leaderboard-container');

// Écoute des clics sur les onglets
monthTab.addEventListener('click', () => {
  // Affichage du classement du mois
  monthTab.classList.add('active-tab');
  globalTab.classList.remove('active-tab');
  monthContainer.style.display = 'block';
  globalContainer.style.display = 'none';
});

globalTab.addEventListener('click', () => {
  // Affichage du classement général
  monthTab.classList.remove('active-tab');
  globalTab.classList.add('active-tab');
  monthContainer.style.display = 'none';
  globalContainer.style.display = 'block';
});

