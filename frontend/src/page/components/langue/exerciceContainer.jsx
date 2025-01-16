import logo from "../../../static/img/mexicain.png"

const ExerciceContainer = ({dataLangue, inputText, handleSubmit, handleInputChange}) => {

    const insertCharacter = (lettre) => {
  
        document.getElementById("response").value += lettre;
  
    };

    return (
        <>
            <div class="exercice-container">
                    <div class="exercice-title">
                        <h1 class="instruction">Conjugue le verbe suivant</h1>
                    </div>
                    <div class="exercice-section">
                        <div class="exercice-question">
                            <div class="exercice-image">
                                <img src={logo}/>
                            </div>
                            
                            { dataLangue.rappel != "" ? (
                                                        
                                <div>
                                    <div class="exercice-reminder">
                                        <span>Erreur récente sur ce verbe, essaye à nouveau !</span>
                                    </div>
                                    <div class="exercice-verb-reminder">
                                        <span>({dataLangue.pronouns}) {dataLangue.verb} [{dataLangue.time}]</span>
                                    </div>
                               </div>
                            ) : (
                                                
                                <div class="exercice-verb">
                                    <span>({dataLangue.pronouns}) {dataLangue.verb} [{dataLangue.time}]</span>
                                </div> 
                            )}

                        </div>
                        <form id="actualisation" action="" method="post" name="form2" onSubmit={handleSubmit} >
                            <div class="exercice-input">
                                {dataLangue.reponseUser == "" ? (
                                    <input value={inputText} type="text" id="response" name="reponse" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" lang="es" placeholder="Entrer le verbe conjugué" onChange={handleInputChange} />
                                ) : (
                                    <input value={dataLangue.reponseVerb} type="text" id="response" name="reponse" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" lang="es" placeholder="Entrer le verbe conjugué" readonly disabled={true}/>
                                )}
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