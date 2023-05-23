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

    const [inputText, setInputText] = useState('');    

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

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    //submit to flask

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const formElements = e.target.elements


        for (let i = 0; i < formElements.length; i++){
            const element = formElements[i];

            if (element.checked) {
                const name = element.name;
                const value = element.value;
                formData.append(name, value) 

            } else if (element.type === "text") {

                const name = element.name;
                const value = element.value;
                formData.append(name, value)

            } else if (element.type === "submit" && element.value == "continue") {
                const name = element.name;
                const value = element.value;
                formData.append(name, value)
            }
        }

        const response = await fetch('/es', {
            method: 'POST',
            body: formData
        }).then((res) =>
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

        setInputText('')
    };

    return (
    <>
        <Header
         dataHeader={dataEs}/>

             <div class="main-container">

                <ParametersContainer 
                 dataEspagnol = {dataEs}
                 handleSubmit = {handleSubmit} />
                    
                <ExerciceContainer
                 dataEspagnol = {dataEs}
                 inputText = {inputText}
                 handleSubmit = {handleSubmit}
                 handleInputChange={handleInputChange}/>

             </div>

             <BasPage
              dataEspagnol = {dataEs}
              handleSubmit = {handleSubmit} />

        <Footer />

   </>
  )
};

export default Espagnol;