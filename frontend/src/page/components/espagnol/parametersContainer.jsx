function verifi() {

    var checkBox1 = document.getElementById("1");
    var checkBox2 = document.getElementById("2");
    var checkBox3 = document.getElementById("3");
    var checkBox4 = document.getElementById("4");
    var checkBox5 = document.getElementById("5");
    var checkBox6 = document.getElementById("6");
    var checkBox7 = document.getElementById("7");

    var tous = document.getElementById("tous");
    var irregulier = document.getElementById("irreguliers");
    var regulier = document.getElementById("reguliers");

    if (checkBox1.checked == false && checkBox2.checked == false && checkBox3.checked == false && checkBox4.checked == false && checkBox5.checked == false && checkBox6.checked == false && checkBox7.checked == false){
    //   verifi.preventDefault();
      alert("Choisir et valider un ou plusieurs temps");
      return false;

    } else if (tous.checked == false && irregulier.checked == false && regulier.checked == false){
    //   verifi.preventDefault();
      alert("Choisir les verbes réguliers, irréguliers ou tous");
      return false;
    }
        
};

const ParametersContainer = ({dataEspagnol, handleSubmit, handleChange}) => {

    return (
        <>
            <div class="parameters-container">

                <form id="initialisation" action="" method="post" name="form1" onSubmit={handleSubmit}>

                    <div class="times-container">
                        <div class="parameter-title">
                            <h2>Séléctionner les temps à réviser</h2>
                        </div>
                        <div class="times-list">
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Futuro" id="1" onChange={handleChange} {...dataEspagnol.banane}/>
                                <label for="futuro">Futuro</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Conditional" id="2" onChange={handleChange} {...dataEspagnol.banane2}/>
                                <label for="conditional">Condicional</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Presente de indicativo" id="3" onChange={handleChange} {...dataEspagnol.banane3}/>
                                <label for="presente-indicativo">Presente de indicativo</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Presente de subjonctivo" id="4" onChange={handleChange} {...dataEspagnol.banane4}/>
                                <label for="presente-subjonctivo">Presente de subjuntivo</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Pretérito imperfecto de indicativo" id="5" onChange={handleChange} {...dataEspagnol.banane5}/>
                                <label for="preterito-imperfecto-indicativo">Pretérito imperfecto de indicativo</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Pretérito indefinido" id="6" onChange={handleChange} {...dataEspagnol.banane6}/>
                                <label for="preterito-indefinido">Pretérito indefinido</label>
                            </div>
                            <div class="time-input">
                                <input type="checkbox" name="temps" value="Prétero imperfecto de subjonctivo" id="7" onChange={handleChange} {...dataEspagnol.banane7}/>
                                <label for="preterito-imperfecto-subjonctivo">Pretérito imperfecto de subjuntivo</label>
                            </div>
                        </div>
                    </div>

                    <div class="switch-container">
                        <div class="parameter-title">
                            <h2>Séléctionner les verbes à conjuguer</h2>
                        </div>
                        <div class="switch-toggle">
                            <input type="radio" name="drone" value="reguliers" id="reguliers" onChange={handleChange} {...dataEspagnol.kiwi}/>
                            <label for="reguliers">Réguliers</label>
              
                            <input type="radio" name="drone" value="tous" id="tous" onChange={handleChange} {...dataEspagnol.kiwi2}/>
                            <label for="tous">Tous</label>
              
                            <input type="radio" name="drone" value="irreguliers" id="irreguliers" onChange={handleChange} {...dataEspagnol.kiwi3}/>
                            <label for="irreguliers">Irréguliers</label>
                        </div>
                    </div>

                    <div class="parameters-button-container">
                        <button class="submit-button" >
                            <span class="button-content">Confirmer les paramètres</span>
                        </button>
                    </div>
                
                </form>

            </div>
        </>
    )

};

export default ParametersContainer;