import { Link } from "react-router-dom";

import spainFlag from "../../../static/img/flags/spainFlag.png";
import germanyFlag from "../../../static/img/flags/germanyFlag.png";
import italianFlag from "../../../static/img/flags/italyFlag.png";


const WelcomeArea = () => {
    return (
        <>
        <div class="welcome-area" id="welcome">

                <div class="header-text">
                    <div class="homeContainer">
                        <div class="row">
                            <div class="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12"
                                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                                <h1>Plus d'excuse pour <em>conjuguer</em>, des bonnes notes <em>assurées</em></h1>
                                    <p>Conjug.fr est un site de conjugaison dédié aux étudiants.
                                        Révisez toutes vos conjugaisons dans plusieurs langues étrangères,
                                        et améliorez votre score avec notre système d'XP.</p>

                                {/*{% if username == "Connexion" %}
                                <Link to="/connexion" class="main-button-slider">Créer ton compte</Link>
                                {%else%}
                                <Link to="{{url_for('username_route', username = username)}}" class="main-button-slider">Voir ton compte</Link>
                                {%endif%}*/}

                            </div>
                            <div class="language-selector">
                                <Link to="/es">
                                    <div class="flag">
                                    <img src={ spainFlag } alt="Spain Flag"/>
                                    <span>Espagnol</span>
                                    </div>
                                </Link>
                                <Link to="/de">
                                    <div class="flag">
                                    <img src={ germanyFlag } alt="Germany Flag"/>
                                    <span>Allemand</span>
                                    </div>
                                </Link>
                                <Link to="/it">
                                    <div class="flag">
                                    <img src={ italianFlag } alt="Italy Flag"/>
                                    <span>Italien</span>
                                    </div>
                                </Link>
                              </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default WelcomeArea;