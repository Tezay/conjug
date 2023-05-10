import React, { useState, useEffect } from 'react';

function App() {
    //state (état, données)
    const [dataHome, setdataHome] = useState({
        username: ""
    });

    const [dataDe, setdataDe] = useState({
        username: ""
    });

    const [dataIt, setdataIt] = useState({
        time: "",
        pronouns: "",
        verb: "",
        reponseUser: "",
        reponseVerb: "",
        banane: "",
        banane2: "",
        banane3: "",
        banane4: "",
        banane5: "",
        kiwi: "",
        kiwi2: "",
        kiwi3: "",
        username: "",
        rappel: "",
    });

    const [dataEs, setdataEs] = useState({
        time: "",
        pronouns: "",
        verb: "",
        reponseUser: "",
        reponseVerb: "",
        banane: "",
        banane2: "",
        banane3: "",
        banane4: "",
        banane5: "",
        banane6: "",
        banane7: "",
        kiwi: "",
        kiwi2: "",
        kiwi3: "",
        username: "",
        rappel: "",
    });

    const [dataConnexion, setdataConnexion] = useState({
        username: ""
    });

    const [dataProfile, setdataProfile] = useState({
        date_creation: "",
        xp: "",
        etablissement: "",
        day_streak: "",
        logo: "",
        username2: "",
        level: "",
        classement: "",
        classementJoueurs: "",
        username: "",
    });

    const [dataSearch, setdataSearch] = useState({
        username:""
        utilisateurs: ""
    });

    const [dataLeaderboard, setdataLeaderboard] = useState({
        username: "",
        utilisateurs: "",
        classementPlayers: "",
        classementWeek: "",
        classementMonth: "",
    });

    // components

    useEffect(() => {
        fetch('/home').then((res) =>
            res.json().then((data) => {
                setdataHome({
                    username: data.username,
                });
            })
        );
    }, []);

    useEffect(() => {
        fetch('/de').then((res) =>
            res.json().then((data) => {
                setdataDe({
                    username: data.username,
                });
            })
        );
    }, []);

    useEffect(() => {
        fetch('/it').then((res) =>
            res.json().then((data) => {
                setdataIt({
                    time: data.time,
                    pronouns: data.pronouns,
                    verb: data.verb,
                    reponseUser: data.reponseUser,
                    reponseVerb: data.reponseVerb,
                    banane: data.banane,
                    banane2: data.banane2,
                    banane3: data.banane3,
                    banane4: data.banane4,
                    banane5: data.banane5,
                    kiwi: data.kiwi,
                    kiwi2: data.kiwi2,
                    kiwi3: data.kiwi3,
                    username: data.username,
                    rappel: data.rappel,
                });
            })
        );
    }, []);

    useEffect(() => {
        fetch('/es').then((res) =>
            res.json().then((data) => {
                setdataEs({
                    time: data.time,
                    pronouns: data.pronouns,
                    verb: data.verb,
                    reponseUser: data.reponseUser,
                    reponseVerb: data.reponseVerb,
                    banane: data.banane,
                    banane2: data.banane2,
                    banane3: data.banane3,
                    banane4: data.banane4,
                    banane5: data.banane5,
                    banane6: data.banane6,
                    banane7: data.banane7,
                    kiwi: data.kiwi,
                    kiwi2: data.kiwi2,
                    kiwi3: data.kiwi3,
                    username: data.username,
                    rappel: data.rappel,
                });
            })
        );
    }, []);

    useEffect(() => {
        fetch('/connexion').then((res) =>
            res.json().then((data) => {
                setdataConnexion({
                    username: data.username,
                });
            })
        );
    }, []);

    useEffect(() => {
        fetch('/profile/<username>').then((res) =>
            res.json().then((data) => {
                setdataProfile({
                    date_creation: data.date_creation,
                    xp: data.xp,
                    etablissement: data.etablissement,
                    day_streak: data.day_streak,
                    logo: data.logo,
                    username2: data.username2,
                    level: data.level,
                    classement: data.classement,
                    classementJoueurs: data.classementJoueurs,
                    username: data.username,
                });
            })
        );
    }, []);

    useEffect(() => {
        fetch('/search').then((res) =>
            res.json().then((data) => {
                setdataSearch({
                    username:data.username
                    utilisateurs: data.utilisateurs
                });
            })
        );
    }, []);

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

    // affichage (render)

    return (
        <div className="App">
             <h1>The pseudo is {dataProfile.username}</h1>
        </div>
    );
}

export default App;
