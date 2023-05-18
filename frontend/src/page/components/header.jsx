import { Link } from "react-router-dom";

import spainFlag from "../../static/img/flags/spainFlag.png";
import germanyFlag from "../../static/img/flags/germanyFlag.png";
import italianFlag from "../../static/img/flags/italyFlag.png";
import blackArrow from "../../static/img/backArrow.png";
import burgerMenu from "../../static/img/menu.png";
import logo from "../../static/img/logo.png";
import profileOrange from "../../static/assets/profile-orange.svg"

import "../../static/css/header.css";

function toggleNav() {
  var menu = document.getElementById("menu");
  if (menu.classList.contains("active")) {
     closeNav();
  } else {
     openNav();
  }
};

function openNav() {
  document.getElementById("menu").classList.add("active");
};

function closeNav() {
  document.getElementById("menu").classList.remove("active");
};


const Header = ({dataHeader}) => {
    return (
    <>
        <header class='sticky'>
            <nav class="headerNavbar">
              <div class="navbar-left">
                <Link to="/">
                  <img src={logo} alt="Logo"/>
                  <span class="navbar-title">conjug.fr</span>
                </Link>
              </div>
              <div class="navbar-right">
                <span class="flags">
                  <div class="spain"><Link to="/es"><img src={spainFlag} alt=''/></Link></div>
                  <div class="german"><Link to="/de"><img src={germanyFlag} alt=''/></Link></div>
                  <div class="italian"><Link to="/it"><img src={italianFlag} alt=''/></Link></div>

                </span>
                <span class="interactionButtons">
                  <Link to="/leaderboard">
                    <div class="github-button">Classement</div>
                  </Link>
                  <Link to="/connexion">
                    <div class="connexion-button">{dataHeader.username}</div>
                  </Link>
                {  /*<Link to={`/profile/${dataHeader.username}`}>
                                    <div class="connexion-button"><img src={profileOrange} class="icon" alt="Profile Icon"/>{dataHeader.username}</div>
                                  </Link>*/}
                </span>

                <div class="menu-burger">
                  <Link id="openBtn" onClick={toggleNav}><img src={burgerMenu} alt="Menu"/></Link>
                </div>
              </div>
            </nav>

            <div id="menu" class="menu">
              <Link id="openBtn" onClick={toggleNav} class="back-arrow"><img src={blackArrow} alt="Back"/></Link>
              <ul>
                <li><Link to="/es"><img src={spainFlag}/><span>Espagnol</span></Link></li>
                <li><Link to="/de"><img src={germanyFlag}/><span>Allemand</span></Link></li>
                <li><Link to="/it"><img src={italianFlag}/><span>Italien</span></Link></li>
              </ul>
              <div class="interactionButtons-burger">
                <div class="github-button-burger"><Link to="/leaderboard" target="blank">Classement</Link></div>
                <div class="connexion-button-burger"><Link to={`/profile/${dataHeader.username}`}>{dataHeader.username}</Link></div>
              </div>
            </div>
        </header>
    </>
   )
};

export default Header;