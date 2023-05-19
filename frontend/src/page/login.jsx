import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Header from "./components/header";
import Footer from "./components/footer";
import MainLogin from "./components/login/main";

import "../static/css/login.css"


const Connexion = () => {

    //state

    const [dataConnexion, setdataConnexion] = useState({
        username: "",
    });

    //Navigation

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const formElements = e.target.elements


        for (let i = 0; i < formElements.length; i++){
            const element = formElements[i];

            const name = element.name;
            const value = element.value;
            formData.append(name, value) 
        }

        if (e.target.name === "signup"){
            const response = await fetch('/signup', {
                method: 'POST',
                body: formData
            }).then((res) =>
                res.json().then((data) => {
                    setdataConnexion({
                        retour : data.retour
                    });
                })
            );
        } else if (e.target.name === "signin"){
            const response = await fetch('/signin', {
                method: 'POST',
                body: formData
            }).then((res) =>
                res.json().then((data) => {
                    setdataConnexion({
                        retour : data.retour
                    });
                })
            );
        }
    }

    if (dataConnexion.retour === "trueConnect"){
        navigate("/");
        alert("Connexion réussi");
    } else if (dataConnexion.retour === "trueCreation"){
        navigate("/");
        alert("Bienvenue sur Conjug.fr merci d'avoir créé un compte")
    } else if (dataConnexion.retour === "falseEmail"){
        alert("Email déjà utilisé");
    } else if (dataConnexion.retour === "falseUsername"){
        alert("Nom d'utilisateur déjà pris");
    } else if (dataConnexion.retour === "falseAuth"){
        alert("erreur d'authentification")
    };
    


    return (
    <>
        <Header
         dataHeader={dataConnexion}/>

         <MainLogin 
          handleSubmit = {handleSubmit}/>

        <Footer />

   </>
  )
};

export default Connexion;