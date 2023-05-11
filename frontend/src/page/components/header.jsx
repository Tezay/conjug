import React from 'react';
import "../../static/css/header.css"

const Header = () => {
    return (
        <header class='sticky'>
        <nav class="headerNavbar">
          <div class="navbar-left">
            <a href="{{url_for('home')}}">
              <img src="img/logo.png" alt="Logo"/>
              <span class="navbar-title">conjug.fr</span>
            </a>
          </div>
          <div class="navbar-right">
            <span class="flags">
              <div class="spain"><a href="{{url_for('es')}}"><img src="{{ url_for('static', filename='img/flags/spainFlag.png') }}"/></a></div>
              <div class="german"><a href="{{url_for('de')}}"><img src="{{ url_for('static', filename='img/flags/germanyFlag.png') }}"/></a></div>
              <div class="italian"><a href="{{url_for('it')}}"><img src="{{ url_for('static', filename='img/flags/italyFlag.png') }}"/></a></div>
              
            </span>
            <span class="interactionButtons">
              <a href="{{url_for('leaderboard')}}">
                <div class="github-button">Classement</div>
              </a>
              <a href="{{url_for('connexion')}}">
                <div class="connexion-button">username</div>
              </a>
              {/* <a href="{{url_for('username_route', username = username)}}">
                <div class="connexion-button"><img src="{{ url_for('static', filename='assets/profile-orange.svg') }}" class="icon" alt="Profile Icon">{{username}}</div>
              </a> */}
            </span>

            <div class="menu-burger">
              <a id="openBtn" onclick="toggleNav()"><img src="{{url_for('static', filename='img/menu.png')}}" alt="Menu"/></a>
            </div>
          </div>
        </nav>

        <div id="menu" class="menu">
          <a id="openBtn" onclick="toggleNav()" class="back-arrow"><img src="{{url_for('static', filename='img/backArrow.png')}}" alt="Back"/></a>
          <ul>
            <li><a href="{{url_for('es')}}"><img src="{{ url_for('static', filename='img/flags/spainFlag.png') }}"/><span>Espagnol</span></a></li>
            <li><a href="{{url_for('de')}}"><img src="{{ url_for('static', filename='img/flags/germanyFlag.png') }}"/><span>Allemand</span></a></li>
            <li><a href="{{url_for('it')}}"><img src="{{ url_for('static', filename='img/flags/italyFlag.png') }}"/><span>Italien</span></a></li>
          </ul>
          <div class="interactionButtons-burger">
            <div class="github-button-burger"><a href="https://github.com/Tezay/conjug" target="blank">GitHub</a></div>
            <div class="connexion-button-burger"><a href="{{url_for('username_route', username = username)}}">username</a></div>
          </div>
        </div>
    </header>
    )
}

export default Header;