import { useState } from "react";

const SearchBar = () => {

    const searchUsername = () => {
        const input = document.getElementById('searchbar').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const userBox = document.getElementsByClassName('userBox');

        for (let i = 0; i < userBox.length; i++) {
          const username = userBox[i].querySelector('.username').textContent.toLowerCase();

          if (!username.includes(input)) {
            userBox[i].style.display = 'none';
          } else {
            userBox[i].style.display = 'flex';
          }
        }
    };

    return (
        <>
            <div class="searchbar-container">
              <input class="searchbar" id="searchbar" onKeyUp={searchUsername} type="search" name="search" placeholder="Rechercher un utilisateur"/>
            </div>
        </>
    )
};

export default SearchBar;


    