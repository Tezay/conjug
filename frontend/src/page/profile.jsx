import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Header from "./components/header"
import Footer from "./components/footer"
import UserInfos from "./components/profile/userInfos"
import BasPage from "./components/profile/basPage"

import "../static/css/profileStyle.css"

const Profile = () => {

    //state

    const [dataHome, setdataHome] = useState({
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

    //Navigation

    const navigate = useNavigate();

    // components

    useEffect(() => {
        fetch('/home').then((res) =>
            res.json().then((data) => {
                setdataHome({
                    username: data.username,
                });
            })
        )
    }, []);

    useEffect(() => {
        if (dataHome.username) {
            fetch(`/profile/${dataHome.username}`).then((res) =>
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
        };
    }, [dataHome.username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        const response = await fetch('/logout').then((res) =>
            res.json().then((data) => {
                setdataProfile({
                    redirect: data.redirect
                });
            })
        );
    };

    if (dataProfile.redirect === "true"){
        alert('Déconnection réussi')
        navigate("/");
    }
      

    return (
    <>
        <Header
         dataHeader={dataProfile}/>

            <UserInfos
             dataProfile={dataProfile}
             handleSubmit={handleSubmit}  />

            <BasPage
             dataProfile={dataProfile} />

        <Footer />

   </>
  )
};

export default Profile;