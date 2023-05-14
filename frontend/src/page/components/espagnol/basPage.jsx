const BasPage = () => {

    return(
        <>
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
                        <button class="submit-button" type="submit" form="actualisation">
                            <span class="button-content">Valider</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BasPage;