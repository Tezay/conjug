import profile from "../../../static/assets/profile.svg"
import clock from "../../../static/assets/clock.svg"
import pin from "../../../static/assets/pin.svg"
import share from "../../../static/assets/share.svg"
import logout from "../../../static/assets/logout.svg"
import logo from "../../../static/img/mexicain.png"

const UserInfos = ({dataProfile, handleSubmit}) => {

    return (
        <>
            <div class="userInfos">
                <div class="userInfosContainer">
                    <img src={logo} alt="Logo" id="userIcon" />
                    <div class="userInfoFields">
                        <div class="userInfosProfile">
                            <img src={profile} class="icon" alt="Profile Icon" />
                            <h1>{dataProfile.username2}</h1>
                        </div>
                        <div class="userInfosCreationDate">
                            <img src={clock} class="icon" alt="Clock Icon" />
                            <p>A rejoint le {dataProfile.date_creation}</p>
                        </div>
                        <div class="userInfosEtablissement">
                            <img src={pin} class="icon" alt="Pin Icon" />
                            <p>{dataProfile.etablissement}</p>
                        </div>
                    </div>
                </div>
                <div class="userInteraction">
                  <button class="button-settings" >
                        <img src={share} class="icon" alt="Share Icon" />
                        Partager ce profil
                  </button>
                  <button class="button-share-profile" onClick={handleSubmit} >
                      <img src={logout} class="icon" alt="Logout Icon" />
                      Se déconnecter
                  </button>
                </div>
            </div>
        </>
    )
};

export default UserInfos;