const BasPage = ({dataProfile}) => {

    return (
        <>
          <div class="bottomContainer">
            <div class="userCaracteristics">
                <div class="userStats">
                      <h2>Statistiques</h2>
                      <div class="statsUp">
                        <div class="statElement">
                          <p>⚡ Jours de suite : {dataProfile.day_streak}</p>
                        </div>
                        <div class="statElement">
                          <p>✨ XP Total : {dataProfile.xp}</p>
                        </div>
                      </div>
                      <div class="statsDown">
                        <div class="statElement">
                          <p>🎖️ Classement : {dataProfile.classement}</p>
                        </div>
                        <div class="statElement">
                          <p>🎖️ Classement du mois : .</p>
                        </div>
                      </div>
                  </div>
            </div>
            <div class="leaderboard">
              {/*<!-- Importer depuis un fichier leaderboard.html -->*/}
            </div>
          </div>
        </>
    )
};

export default BasPage;


