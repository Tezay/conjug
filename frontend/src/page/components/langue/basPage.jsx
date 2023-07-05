import rightAnswer from "../../../static/assets/right-answer.svg"
import wrongAnswer from "../../../static/assets/wrong-answer.svg"

const BasPage = ({dataLangue, handleSubmit, handleChange}) => {

    return(
        <>
        { dataLangue.reponseUser === '' ? (

            <div class="interaction-container" id="interaction-default">
                <div class="interaction-grid">
                    <div class="skip-container">
                        <button class="skip-button" name="skip">
                            <span class="button-content">Passer</span>
                        </button>
                    </div>
                    <div class="lesson-container">
                        <button class="lesson-button">
                            <span class="button-content">Un doute ? Revoir la leçon !</span>
                        </button>
                    </div>
                    <div class="confirm-container">
                        <button class="submit-button" type="submit" form="actualisation" >
                            <span class="button-content">Valider</span>
                        </button>
                    </div>
                </div>
            </div>
        ) : dataLangue.reponseUser === true ? (

            <div class="interaction-container" id="right-answer">
                <div class="interaction-grid">
                    <div class="correction-left-container">
                        <div class="image-container">
                            <img src={rightAnswer} class="interaction-image" alt="Wrong response Image" />
                        </div>
                        <div class="correction-container">
                            <div class="correction-title-container">
                                <h3>Bonne réponse !</h3>
                            </div>
                        </div>
                    </div>
                    <div class="lesson-container">
                        <button class="lesson-button">
                            <span class="button-content">Un doute ? Revoir la leçon !</span>
                        </button>
                    </div>
                    <div class="pass-button">
                        <form action="" method="post" onSubmit={handleSubmit}>
                            <button name="continue" value="continue" class="submit-button" type="submit" >
                                <span class="button-content">Continuer</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        ) : (

            <div class="interaction-container" id="wrong-answer">
                <div class="interaction-grid">
                    <div class="correction-left-container">
                        <div class="image-container">
                            <img src={wrongAnswer} class="interaction-image" alt="Wrong response Image"/>
                        </div>
                        <div class="correction-container">
                            <div class="correction-title-container">
                                <h3>La réponse était :</h3>
                            </div>
                            <div class="correction-texte-container">
                                <p>➡️ {dataLangue.reponseUser}</p>
                            </div>
                        </div>
                    </div>
                    <div class="lesson-container">
                        <button class="lesson-button">
                            <span class="button-content">Un doute ? Revoir la leçon !</span>
                        </button>
                    </div>
                    <div class="pass-button">
                        <form action="" method="post" onSubmit={handleSubmit}>
                            <button name="continue" value ="continue" class="submit-button" type="submit" >
                                <span class="button-content">Continuer</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )}
        </>
    )
};

export default BasPage;