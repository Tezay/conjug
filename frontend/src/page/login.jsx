import { useEffect, useState } from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import MainLogin from "./components/login/main";

import "../static/css/login.css"


const Connexion = () => {

    //state

    const [dataConnexion, setdataConnexion] = useState({
        username: ""
    });

    // components

    useEffect(() => {
        fetch('/connexion').then((res) =>
            res.json().then((data) => {
                setdataConnexion({
                    username: data.username,
                });
            })
        );
    }, []);

    const reload = (e) => {
        e.preventDefault();
    };


    return (
    <>
        <Header
         dataHeader={dataConnexion}/>

         <MainLogin 
          reload = {reload}/>

        <Footer />

   </>
  )
};

export default Connexion;