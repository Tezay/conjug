function insertCharacter(lettre){
  
  document.getElementById("response").value += lettre;
  
};

const ExerciceContainer = ({dataEspagnol}) => {

    return (
        <>
            <div class="exercice-container">
                    <div class="exercice-title">
                        <h1>Conjugue le verbe en espagnol</h1>
                    </div>
                    <div class="exercice-section">
                        <div class="exercice-question">
                            <div class="exercice-image">
                                <img src="https://cdn.discordapp.com/attachments/1098726716798673016/1099104373650497647/mexicain.png"/>
                            </div>
                            
                            {/*{% if rappel != "" %}
                                                        
                                <div>
                                    <div class="exercice-reminder">
                                        <span>Erreur récente sur ce verbe, essaye à nouveau !</span>
                                        </div>
                             <div class="exercice-verb-reminder">
                            <span>({{pronouns}}) {{verb}} [{{time}}]</span>
                                      </div>
                               </div>
                                                        
                                 {% else %}*/}

                            <div class="exercice-verb">
                                <span>({dataEspagnol.pronouns}) {dataEspagnol.verb} [{dataEspagnol.time}]</span>
                            </div> 
                            

                        </div>
                        <form id="actualisation" action="localhost:5000/es" method="post" name="form2">
                            <div class="exercice-input">
                                {/*{% if reponseUser == "" %}
                                <input value="{{reponseVerb}}" type="text" id="response" name="reponse" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" lang="es" placeholder="Entrer le verbe conjugué" readonly>
                                {% else %}*/}
                                <input value="{dataEspagnol.reponseVerb}" type="text" id="response" name="reponse" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" lang="es" placeholder="Entrer le verbe conjugué"/>
                            </div>
                        </form>
                        <div class="exercice-special-characters">
                            <button id="a" onClick={() => insertCharacter('á')}>á</button>
                            <button id="i" onClick={() => insertCharacter('í')}>í</button>
                            <button id="o" onClick={() => insertCharacter('ó')}>ó</button>
                            <button id="u" onClick={() => insertCharacter('ú')}>ú</button>
                            <button id="n" onClick={() => insertCharacter('ñ')}>ñ</button>
                        </div>
                    </div>
                </div>
        </>
    )
};

export default ExerciceContainer;