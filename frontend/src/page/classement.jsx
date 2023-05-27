import { useEffect, useState } from "react";    

import Header from "./components/header"
import Footer from "./components/footer"
import SearchBar from "./components/searchbar"
import GlobalLeaderboard from "./components/leaderboard/globalLeaderboard"
import MonthLeaderboard from "./components/leaderboard/monthLeaderboard"

import "../static/css/leaderboard.css"

const Leaderboard = () => {

    const [dataLeaderboard, setdataLeaderboard] = useState({
        username: "",
        utilisateurs: "",
        classementPlayers: "",
        classementWeek: "",
        classementMonth: "",
    });

    const monthTab = document.querySelector('.leaderboard-tab[data-tab="month"]');
    const globalTab = document.querySelector('.leaderboard-tab[data-tab="global"]');
    const monthContainer = document.querySelector('.month-leaderboard-container');
    const globalContainer = document.querySelector('.global-leaderboard-container');

    const monthFonc = () => {
        // Affichage du classement du mois
        monthTab.classList.add('active-tab');
        globalTab.classList.remove('active-tab');
        monthContainer.style.display = 'block';
        globalContainer.style.display = 'none';
    };

    const globalFonc = () => {
        // Affichage du classement général
        monthTab.classList.remove('active-tab');
        globalTab.classList.add('active-tab');
        monthContainer.style.display = 'none';
        globalContainer.style.display = 'block';
    };

    useEffect(() => {
        fetch('/leaderboard').then((res) =>
            res.json().then((data) => {
                setdataLeaderboard({
                    username: data.username,
                    utilisateurs: data.utilisateurs,
                    classementPlayers: data.classementPlayers,
                    classementWeek: data.classementWeek,
                    classementMonth: data.classementMonth,
                });
            })
        );
    }, []);

    return (
        <>
            <Header
             dataHeader={dataLeaderboard}/>

                <div class="search-container">
                    <SearchBar />
                </div>

                <div class="leaderboard-tabs-container">
                    <div class="leaderboard-tab active-tab" data-tab="month" onClick={monthFonc} >Classement du mois</div>
                    <div class="leaderboard-tab" data-tab="global" onClick={globalFonc} >Classement général</div>
                </div>
                    
                <div class="leaderboard-container">
                    <div class="leaderboard-content active-content" id="month">
                     {/*<!-- contenu du leaderboard du mois ici -->*/}
                    </div>
                    <div class="leaderboard-content" id="global">
                    {/*<!-- contenu du leaderboard général ici -->*/}
                    </div>
                </div>

                <div class="leaderboard-container">

                    <MonthLeaderboard
                     dataLeaderboard = {dataLeaderboard} />

                    <GlobalLeaderboard
                     dataLeaderboard={dataLeaderboard} />

                </div>

            <Footer />

        </>
    )
};

export default Leaderboard;