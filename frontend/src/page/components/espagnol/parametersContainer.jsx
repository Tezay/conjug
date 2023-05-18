import { useState, useEffect } from 'react';

const ParametersContainer = ({dataEspagnol, handleSubmit}) => {

    //state

    const [tempsValues, setTempsValues] = useState({
        temps1: dataEspagnol.banane,
        temps2: dataEspagnol.banan2,
        temps3: dataEspagnol.banane3,
        temps4: dataEspagnol.banane4,
        temps5: dataEspagnol.banane5,
        temps6: dataEspagnol.banane6,
        temps7: dataEspagnol.banane7,
        type1: dataEspagnol.kiwi,
        type2: dataEspagnol.kiwi2, 
        type3: dataEspagnol.kiwi3,
    });

    //components

    useEffect(() => {
        setTempsValues((prevValues) => ({
            ...prevValues,
            temps1: dataEspagnol.banane,
            temps2: dataEspagnol.banane2,
            temps3: dataEspagnol.banane3,
            temps4: dataEspagnol.banane4,
            temps5: dataEspagnol.banane5,
            temps6: dataEspagnol.banane6,
            temps7: dataEspagnol.banane7,
            type1: dataEspagnol.kiwi,
            type2: dataEspagnol.kiwi2, 
            type3: dataEspagnol.kiwi3,
        }));
    }, [dataEspagnol]);

    const handleChange = (e) => {
        const { id, checked } = e.target;
        
        if (checked) {

            setTempsValues(prevValues => ({...prevValues, [id]: "checked",}));
        } else {
            setTempsValues(prevValues => ({...prevValues, [id]: "none",}));
        }

        if (id[1] === "y"){
            setTempsValues(prevValues => ({...prevValues, [id]: "checked",}));

            if (id != "type1") {
                setTempsValues(prevValues => ({...prevValues, "type1": "none",}));
            }
            if (id != "type2"){
                setTempsValues(prevValues => ({...prevValues, "type2": "none",}));
            }
            if (id != "type3"){
                setTempsValues(prevValues => ({...prevValues, "type3": "none",}));
            }   
        }
    };

    const handleVerification = (e) => {
        var checkBox1 = document.getElementById("temps1");
        var checkBox2 = document.getElementById("temps2");
        var checkBox3 = document.getElementById("temps3");
        var checkBox4 = document.getElementById("temps4");
        var checkBox5 = document.getElementById("temps5");
        var checkBox6 = document.getElementById("temps6");
        var checkBox7 = document.getElementById("temps7");

        var regulier = document.getElementById("reguliers");
        var tous = document.getElementById("tous");
        var irregulier = document.getElementById("irreguliers");

        if (checkBox1.checked === false && checkBox2.checked === false && checkBox3.checked === false && checkBox4.checked === false && checkBox5.checked === false && checkBox6.checked === false && checkBox7.checked === false) {
            e.preventDefault();
            alert("Choisir et valider un ou plusieurs temps");
            return false;
        } else if (tous.checked === false && irregulier.checked === false && regulier.checked === false) {
            e.preventDefault();
            alert("Choisir les verbes réguliers, irréguliers ou tous");
            return false;
        }
    };

    return (
        <>
            <div class="parameters-container">

                <form id="initialisation" action="" method="post" name="form1" onSubmit={handleSubmit} >

                    <div class="times-container">
                        <div class="parameter-title">
                            <h2>Séléctionner les temps à réviser</h2>
                        </div>
                        <div class="times-list">
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Futuro" id="temps1" onChange={handleChange} checked={tempsValues.temps1  === "checked"} />
                                <label for="futuro">Futuro</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Conditional" id="temps2" onChange={handleChange} checked={tempsValues.temps2  === "checked"} />
                                <label for="conditional">Condicional</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Presente de indicativo" id="temps3" onChange={handleChange} checked={tempsValues.temps3  === "checked"} />
                                <label for="presente-indicativo">Presente de indicativo</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Presente de subjonctivo" id="temps4" onChange={handleChange} checked={tempsValues.temps4  === "checked"} />
                                <label for="presente-subjonctivo">Presente de subjuntivo</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Pretérito imperfecto de indicativo" id="temps5" onChange={handleChange} checked={tempsValues.temps5  === "checked"} />
                                <label for="preterito-imperfecto-indicativo">Pretérito imperfecto de indicativo</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Pretérito indefinido" id="temps6" onChange={handleChange} checked={tempsValues.temps6  === "checked"} />
                                <label for="preterito-indefinido">Pretérito indefinido</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Prétero imperfecto de subjonctivo" id="temps7" onChange={handleChange} checked={tempsValues.temps7  === "checked"} />
                                <label for="preterito-imperfecto-subjonctivo">Pretérito imperfecto de subjuntivo</label>
                            </div>
                        </div>
                    </div>

                    <div class="switch-container">
                        <div class="parameter-title">
                            <h2>Séléctionner les verbes à conjuguer</h2>
                        </div>
                        <div class="switch-toggle">
                            <input type="radio" name="drone" value="reguliers" id="reguliers" checked={tempsValues.type1 === "checked"} />
                            <label for="reguliers" id="type1" onClick={handleChange}>Réguliers</label>
              
                            <input type="radio" name="drone" value="tous" id="tous" checked={tempsValues.type2 === "checked"}/>
                            <label for="tous" id="type2" onClick={handleChange}>Tous</label>
              
                            <input type="radio" name="drone" value="irreguliers" id="irreguliers" checked={tempsValues.type3 === "checked"} />
                            <label for="irreguliers" id="type3" onClick={handleChange}>Irréguliers</label>
                        </div>
                    </div>

                    <div class="parameters-button-container">
                        <button class="submit-button" onClick={handleVerification}>
                            <span class="button-content">Confirmer les paramètres</span>
                        </button>
                    </div>
                
                </form>

            </div>
        </>
    )

};

export default ParametersContainer;