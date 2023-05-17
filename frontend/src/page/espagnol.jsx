import { useEffect, useState } from "react";

import Header from "./components/header"
import Footer from "./components/footer"
import ParametersContainer from "./components/espagnol/parametersContainer"
import ExerciceContainer from "./components/espagnol/exerciceContainer"
import BasPage from "./components/espagnol/basPage"

import "../static/css/exercice.css"


const Espagnol = () => {

    //state

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

    const [inputValues, setInputValues] = useState([]);

    // components

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
      };
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/es', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(inputValues).toString()
        })
        .then((res) =>
            res.json().then((data) => {
                console.log(data.pronous)
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
                console.log(data.pronouns)
            })
        );
    };

    return (
    <>
        <Header
         dataHeader={dataEs}/>

             <div class="main-container">

                <ParametersContainer 
                 dataEspagnol = {dataEs}
                 handleSubmit = {handleSubmit}
                 handleChange = {handleChange} />

                <ExerciceContainer
                 dataEspagnol = {dataEs}/>

             </div>

             <BasPage />

        <Footer />

   </>
  )
};

export default Espagnol;