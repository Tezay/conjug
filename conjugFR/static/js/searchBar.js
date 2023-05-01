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