import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Vérifier d'abord le statut d'authentification
        const statusResponse = await axios.get('/status');
        setAuthStatus(statusResponse.data);

        if (statusResponse.data.status === 'connected') {
          // Récupérer les données du profil
          const profileResponse = await axios.get(`/profile/${statusResponse.data.username}`);
          
          if (profileResponse.data === "User Not Found") {
            setError('Profil utilisateur introuvable');
          } else {
            setUserProfile(profileResponse.data);
          }
        } else {
          // Utilisateur non connecté, rediriger vers la page de connexion
          navigate('/login');
        }
      } catch (err) {
        console.error('Erreur lors du chargement du profil:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('/logout');
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    return dateString;
  };

  const getRankSuffix = (rank) => {
    if (rank === 1) return 'er';
    return 'e';
  };

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-base-100">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-lg text-base-content/70">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center bg-base-100 px-4">
        <div className="card w-full max-w-md bg-base-200 shadow-xl">
          <div className="card-body text-center">
            <div className="text-error mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-error mb-2">Erreur</h2>
            <p className="text-base-content/70 mb-4">{error}</p>
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-full bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header avec avatar et info principales */}
        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-32 h-32 rounded-full">
                  <img 
                    src={userProfile.logo || '/default-avatar.png'} 
                    alt={`Avatar de ${userProfile.username}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Informations principales */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl font-bold text-primary mb-2">
                  {userProfile.username}
                </h1>
                <div className="space-y-2 text-base-content/70">
                  <p className="text-lg">
                    <span className="font-medium">Niveau:</span> {userProfile.level}
                  </p>
                  <p>
                    <span className="font-medium">Membre depuis:</span> {formatDate(userProfile.date_creation)}
                  </p>
                  {userProfile.institution && (
                    <p>
                      <span className="font-medium">Établissement:</span> {userProfile.institution}
                    </p>
                  )}
                </div>
              </div>

              {/* Bouton déconnexion */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline btn-error"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Statistiques de progression */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Progression
              </h2>
              
              <div className="space-y-4">
                <div className="stat bg-base-300 rounded-lg">
                  <div className="stat-title">Points d'expérience</div>
                  <div className="stat-value text-primary">{userProfile.xp}</div>
                  <div className="stat-desc">XP total accumulé</div>
                </div>

                <div className="stat bg-base-300 rounded-lg">
                  <div className="stat-title">Classement général</div>
                  <div className="stat-value text-primary">
                    {userProfile.rank}{getRankSuffix(userProfile.rank)}
                  </div>
                  <div className="stat-desc">Position dans le classement</div>
                </div>

                <div className="stat bg-base-300 rounded-lg">
                  <div className="stat-title">Série quotidienne</div>
                  <div className="stat-value text-primary">{userProfile.day_streak}</div>
                  <div className="stat-desc">Jours consécutifs d'activité</div>
                </div>
              </div>
            </div>
          </div>

          {/* Classements */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Classements
              </h2>

              <div className="space-y-3">
                {userProfile.classement_joueur && Object.keys(userProfile.classement_joueur).length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Top des joueurs</h3>
                    <div className="bg-base-300 rounded-lg p-3">
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {Object.entries(userProfile.classement_joueur)
                          .sort(([,a], [,b]) => a - b)
                          .slice(0, 5)
                          .map(([username, rank]) => (
                            <div key={username} className="flex justify-between items-center py-1">
                              <span className={username === userProfile.username ? 'font-bold text-primary' : ''}>
                                {rank}. {username}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Link to="/leaderboard" className="btn btn-primary btn-sm">
                    Voir tous les classements
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Retour à l'accueil */}
        <div className="text-center mt-8">
          <Link to="/" className="link link-neutral">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
