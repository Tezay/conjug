import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRef } from 'react';
import FlagIcon from '../../components/common/FlagIcon';

const Navbar = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const drawerToggleRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    // Fermer le drawer mobile après navigation
    if (drawerToggleRef.current) {
      drawerToggleRef.current.checked = false;
    }
  };

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" ref={drawerToggleRef} />
      
      {/* Navbar visible */}
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg h-[70px] px-4 md:px-8">
          <div className="navbar-start">
            <Link to="/" className="text-lg md:text-xl font-bold text-white no-underline hover:opacity-80 transition-opacity">
              Conjug.fr
            </Link>
          </div>
          
          {/* Menu desktop - caché sur mobile */}
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1 xl:gap-4 items-center">
              <li>
                <Link to="/it" className="text-white font-medium hover:opacity-80 transition-opacity text-sm xl:text-base px-2 xl:px-3 flex items-center gap-2">
                  <FlagIcon langCode="it" size="sm" />
                  <span>Italien</span>
                </Link>
              </li>
              <li>
                <Link to="/es" className="text-white font-medium hover:opacity-80 transition-opacity text-sm xl:text-base px-2 xl:px-3 flex items-center gap-2">
                  <FlagIcon langCode="es" size="sm" />
                  <span>Espagnol</span>
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-white font-medium hover:opacity-80 transition-opacity text-sm xl:text-base px-2 xl:px-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Classement</span>
                </Link>
              </li>
              
              {isLoading ? (
                <li>
                  <div className="loading loading-spinner loading-sm text-white"></div>
                </li>
              ) : isAuthenticated && user ? (
                <li>
                  <Link to="/profile" className="flex items-center gap-2 text-white font-medium hover:opacity-80 transition-opacity text-sm xl:text-base px-2 xl:px-3">
                    <div className="avatar">
                      <div className="w-6 h-6 rounded-full">
                        <img 
                          src={user.logo || '/default-avatar.png'} 
                          alt={`Avatar de ${user.username}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span>{user.username}</span>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-white font-medium hover:opacity-80 transition-opacity text-sm xl:text-base px-2 xl:px-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Connexion</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-white font-medium hover:opacity-80 transition-opacity text-sm xl:text-base px-2 xl:px-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Inscription</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          {/* Bouton burger - visible sur mobile uniquement */}
          <div className="navbar-end lg:hidden">
            <label htmlFor="mobile-drawer" className="btn btn-square btn-ghost text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
        </div>
      </div>
      
      {/* Drawer sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="min-h-full w-80 bg-base-100 text-base-content">
          {/* Header du drawer */}
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <Link to="/" className="text-xl font-bold text-primary" onClick={handleLinkClick}>
              Conjug.fr
            </Link>
            <label htmlFor="mobile-drawer" className="btn btn-square btn-ghost btn-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </label>
          </div>
          
          {/* Menu mobile */}
          <ul className="menu p-4 w-full text-base-content">
            <li>
              <Link to="/it" className="text-lg py-3 flex items-center gap-3" onClick={handleLinkClick}>
                <FlagIcon langCode="it" size="md" />
                <span>Italien</span>
              </Link>
            </li>
            <li>
              <Link to="/es" className="text-lg py-3 flex items-center gap-3" onClick={handleLinkClick}>
                <FlagIcon langCode="es" size="md" />
                <span>Espagnol</span>
              </Link>
            </li>
            <li className="menu-title mt-4">
              <span>Compte</span>
            </li>
            <li>
              <Link to="/login" className="text-lg py-3" onClick={handleLinkClick}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Connexion
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-lg py-3" onClick={handleLinkClick}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Inscription
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-lg py-3" onClick={handleLinkClick}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profil
              </Link>
            </li>
            <li className="menu-title mt-4">
              <span>Autres</span>
            </li>
            <li>
              <Link to="/leaderboard" className="text-lg py-3" onClick={handleLinkClick}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Classement
              </Link>
            </li>
            {/* Liens légaux */}
            <li className="menu-title mt-4">
              <span>Légal</span>
            </li>
            <li>
              <Link to="/mentions-legales" className="text-lg py-3" onClick={handleLinkClick}>
                Mentions légales
              </Link>
            </li>
            <li>
              <Link to="/politique-de-confidentialite" className="text-lg py-3" onClick={handleLinkClick}>
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link to="/conditions-generales" className="text-lg py-3" onClick={handleLinkClick}>
                Conditions générales
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
