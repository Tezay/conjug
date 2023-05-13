import React from 'react';
import "../../static/css/header.css";
import "../../static/js/script.js";
import spainFlag from "../../static/img/flags/spainFlag.png";
import germanyFlag from "../../static/img/flags/germanyFlag.png";
import italianFlag from "../../static/img/flags/italyFlag.png";
import blackArrow from "../../static/img/backArrow.png";
import burgerMenu from "../../static/img/menu.png";
import logo from "../../static/img/logo.png";

const Header = ({dataHome}) => {
    return (
        <header class='sticky'>
        <nav class="headerNavbar">
          <div class="navbar-left">
            <a href="localhost:3000/">
              <img src={logo} alt="Logo"/>
              <span class="navbar-title">conjug.fr</span>
            </a>
          </div>
          <div class="navbar-right">
            <span class="flags">
              <div class="spain"><a href="localhost:3000/es"><img src={spainFlag}/></a></div>
              <div class="german"><a href="localhost:3000/de"><img src={germanyFlag}/></a></div>
              <div class="italian"><a href="localhost:3000/it"><img src={italianFlag}/></a></div>

            </span>
            <span class="interactionButtons">
              <a href="localhost:3000/leaderboard">
                <div class="github-button">Classement</div>
              </a>
              <a href="localhost:3000/connexion">
                <div class="connexion-button">{dataHome.username}</div>
              </a>
              {/* <a href="{{url_for('username_route', username = username)}}">
                <div class="connexion-button"><img src="{{ url_for('static', filename='assets/profile-orange.svg') }}" class="icon" alt="Profile Icon">{{username}}</div>
              </a> */}
            </span>

            <div class="menu-burger">
              <a id="openBtn" onclick="toggleNav()"><img src={burgerMenu} alt="Menu"/></a>
            </div>
          </div>
        </nav>

        <div id="menu" class="menu">
          <a id="openBtn" onclick="toggleNav()" class="back-arrow"><img src={blackArrow} alt="Back"/></a>
          <ul>
            <li><a href="{{url_for('es')}}"><img src={spainFlag}/><span>Espagnol</span></a></li>
            <li><a href="{{url_for('de')}}"><img src={germanyFlag}/><span>Allemand</span></a></li>
            <li><a href="{{url_for('it')}}"><img src={italianFlag}/><span>Italien</span></a></li>
          </ul>
          <div class="interactionButtons-burger">
            <div class="github-button-burger"><a href="localhost:3000/leaderboard" target="blank">Classement</a></div>
            <div class="connexion-button-burger"><a href="{{url_for('username_route', username = username)}}">username</a></div>
          </div>
        </div>
    </header>
    )
};

export default Header;