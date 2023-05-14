import { Link } from "react-router-dom";

import pen from "../../../static/assets/pen.svg"
import lesson from "../../../static/assets/lesson.svg"
import leaderboard from "../../../static/assets/leaderboard.svg"   



const Card = () => {
    return (
        <>
        <section class="section" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                        data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                        <div class="features-item">
                            <div class="features-icon">
                                <img src={ pen } alt=""/>
                                <h4>Exercices d'entrainement</h4>
                                <p>Des exercices ludiques et interactifs pour s'entrainer à la conjugaison dans tous les temps !</p>
                                <Link to="/es" class="main-button">
                                    Commencer à s'entrainer
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                        data-scroll-reveal="enter bottom move 30px over 0.6s after 0.4s">
                        <div class="features-item">
                            <div class="features-icon">
                                <img src={ lesson } alt=""/>
                                <h4>Pages de révision</h4>
                                <p>Diverses leçons et rappels pour chaque temps, pour ne plus oublier ses terminaisons et irréguliers</p>
                                <Link to="" class="main-button">
                                    Voir nos leçons
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                        data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                        <div class="features-item">
                            <div class="features-icon">
                                <img src={ leaderboard } alt=""/>
                                <h4>Classement interactif</h4>
                                <p>Un classement évolutif pour savoir qui est le meilleur entre vous et vos amis !</p>
                                <Link to="/leaderboard" class="main-button">
                                    Découvrir le classement
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
};

export default Card;
