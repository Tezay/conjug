import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeaderboardData } from '../../services/leaderboardService';

interface LeaderboardData {
  classement_tout: { [username: string]: number };
  classement_semaine: { [username: string]: number };
  utilisateurs: { [username: string]: any };
  users_xp: { [username: string]: { xp: number; xp_week: number; xp_month: number } };
}

interface UserEntry {
  username: string;
  rank: number;
  userData?: any;
}

type LeaderboardView = 'general' | 'weekly';

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [generalPage, setGeneralPage] = useState(1);
  const [weeklyPage, setWeeklyPage] = useState(1);
  const [mobileView, setMobileView] = useState<LeaderboardView>('general');
  
  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    const loadLeaderboardData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLeaderboardData();
        setLeaderboardData(data);
        setError('');
      } catch (err) {
        console.error('Erreur lors du chargement du classement:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboardData();
  }, []);

  const processLeaderboard = (classement: { [username: string]: number }): UserEntry[] => {
    return Object.entries(classement)
      .map(([username, rank]) => ({
        username,
        rank,
        userData: leaderboardData?.utilisateurs[username]
      }))
      .sort((a, b) => {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.username.localeCompare(b.username);
      });
  };

  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const filteredGeneralLeaderboard = useMemo(() => {
    if (!leaderboardData) return [];
    const processed = processLeaderboard(leaderboardData.classement_tout);
    if (!searchQuery) return processed;
    const normalizedQuery = normalizeString(searchQuery);
    return processed.filter(user => 
      normalizeString(user.username).includes(normalizedQuery)
    );
  }, [leaderboardData, searchQuery]);

  const filteredWeeklyLeaderboard = useMemo(() => {
    if (!leaderboardData) return [];
    const processed = processLeaderboard(leaderboardData.classement_semaine);
    if (!searchQuery) return processed;
    const normalizedQuery = normalizeString(searchQuery);
    return processed.filter(user => 
      normalizeString(user.username).includes(normalizedQuery)
    );
  }, [leaderboardData, searchQuery]);

  const paginatedGeneralLeaderboard = filteredGeneralLeaderboard.slice(0, generalPage * ITEMS_PER_PAGE);
  const paginatedWeeklyLeaderboard = filteredWeeklyLeaderboard.slice(0, weeklyPage * ITEMS_PER_PAGE);

  const canLoadMoreGeneral = filteredGeneralLeaderboard.length > generalPage * ITEMS_PER_PAGE;
  const canLoadMoreWeekly = filteredWeeklyLeaderboard.length > weeklyPage * ITEMS_PER_PAGE;

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-base-100">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-lg text-base-content/70">Chargement du classement...</p>
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

  const LeaderboardCard = ({ title, users, page, setPage, canLoadMore, isWeekly = false }: {
    title: string | React.ReactNode;
    users: UserEntry[];
    page: number;
    setPage: (page: number) => void;
    canLoadMore: boolean;
    isWeekly?: boolean;
  }) => (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body lg:p-6 p-3">
        <h2 className="card-title text-2xl mb-4 text-center">
          {title}
        </h2>
        
        <div className="space-y-3">
          {users.length === 0 ? (
            <div className="text-center py-8 text-base-content/70">
              {searchQuery ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur dans ce classement'}
            </div>
          ) : (
            users.map((user, index) => {
              const userXpData = leaderboardData?.users_xp?.[user.username];
              const displayXp = isWeekly ? userXpData?.xp_week : userXpData?.xp;
              
              return (
                <Link
                  key={user.username}
                  to={`/profile/${user.username}`}
                  className="block group"
                >
                  <div className={`card bg-base-100 hover:bg-base-300 transition-colors duration-200 ${
                    user.rank === 1 ? 'border-2 border-yellow-400' :
                    user.rank === 2 ? 'border-2 border-gray-400' :
                    user.rank === 3 ? 'border-2 border-orange-500' :
                    'border border-base-300'
                  }`}>
                    <div className="card-body lg:p-4 p-3">
                      <div className="flex items-center lg:gap-4 gap-2">
                        {/* Badge de rang */}
                        <div className="flex-shrink-0 lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center">
                          {user.rank <= 3 ? (
                            <div className="lg:text-3xl text-2xl leading-none">
                              {user.rank === 1 ? '🥇' : 
                               user.rank === 2 ? '🥈' : 
                               '🥉'}
                            </div>
                          ) : (
                            <div className="badge badge-primary badge-lg font-bold text-sm min-w-[2.5rem] lg:h-10 h-8 rounded-full">
                              #{user.rank}
                            </div>
                          )}
                        </div>
                        
                        {/* Avatar */}
                        <div className="avatar">
                          <div className="lg:w-12 lg:h-12 w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img 
                              src={user.userData?.logo || '/default-avatar.png'} 
                              alt={`Avatar de ${user.username}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Informations utilisateur */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-base-content group-hover:text-primary transition-colors truncate lg:text-base text-sm">
                            {user.username}
                          </div>
                          {user.userData?.institution && (
                            <div className="lg:text-sm text-xs text-base-content/70 truncate">
                              {user.userData.institution}
                            </div>
                          )}
                        </div>
                        
                        {/* XP */}
                        {displayXp !== undefined && (
                          <div className="flex-shrink-0 flex items-center lg:gap-2 gap-1 bg-gradient-to-r from-warning/40 to-warning/30 lg:px-4 lg:py-2 px-2 py-1 rounded-full border-2 border-warning/60 shadow-md backdrop-blur-sm">
                            <svg className="lg:w-5 lg:h-5 w-4 h-4 text-warning drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14.5 2L8 10h4.5L11 22l6.5-8H13l1.5-12z" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"/>
                            </svg>
                            <span className="lg:text-sm text-xs font-black text-warning drop-shadow-md">
                              {displayXp.toLocaleString()}
                            </span>
                          </div>
                        )}
                        
                        {/* Flèche */}
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-base-content/50 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
        
        {canLoadMore && (
          <div className="text-center mt-4">
            <button 
              onClick={() => setPage(page + 1)}
              className="btn btn-primary btn-sm"
            >
              Afficher plus
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-base-100 py-8 lg:px-4 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Header + Barre de recherche */}
        <div className="card bg-base-200 shadow-xl mb-6 max-w-6xl mx-auto">
          <div className="card-body lg:p-6 p-4">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-primary mb-2">Classements</h1>
              <p className="text-lg text-base-content/70">
                Découvrez les meilleurs conjugueurs de Conjug.fr
              </p>
            </div>

            {/* Barre de recherche */}
            <div className="flex justify-center">
              <label className="input input-bordered flex items-center gap-2 w-full max-w-lg">
                <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input 
                  type="search" 
                  className="grow" 
                  placeholder="Nom d'utilisateur..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setGeneralPage(1);
                    setWeeklyPage(1);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Slider mobile */}
        <div className="lg:hidden mb-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body p-3">
              <div className="flex bg-base-300 rounded-full p-1 gap-1">
                <button 
                  className={`flex-1 py-3 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
                    mobileView === 'general' 
                      ? 'bg-primary text-primary-content shadow-md' 
                      : 'text-base-content hover:bg-base-100'
                  }`}
                  onClick={() => setMobileView('general')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Général
                </button>
                <button 
                  className={`flex-1 py-3 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
                    mobileView === 'weekly' 
                      ? 'bg-primary text-primary-content shadow-md' 
                      : 'text-base-content hover:bg-base-100'
                  }`}
                  onClick={() => setMobileView('weekly')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Semaine
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Classements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Vue desktop */}
          <div className="hidden lg:block">
            <LeaderboardCard
              title={
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Classement général
                </span>
              }
              users={paginatedGeneralLeaderboard}
              page={generalPage}
              setPage={setGeneralPage}
              canLoadMore={canLoadMoreGeneral}
              isWeekly={false}
            />
          </div>
          
          <div className="hidden lg:block">
            <LeaderboardCard
              title={
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Classement de la semaine
                </span>
              }
              users={paginatedWeeklyLeaderboard}
              page={weeklyPage}
              setPage={setWeeklyPage}
              canLoadMore={canLoadMoreWeekly}
              isWeekly={true}
            />
          </div>

          {/* Vue mobile */}
          <div className="lg:hidden col-span-full">
            {mobileView === 'general' ? (
              <LeaderboardCard
                title="Classement général"
                users={paginatedGeneralLeaderboard}
                page={generalPage}
                setPage={setGeneralPage}
                canLoadMore={canLoadMoreGeneral}
                isWeekly={false}
              />
            ) : (
              <LeaderboardCard
                title="Classement de la semaine"
                users={paginatedWeeklyLeaderboard}
                page={weeklyPage}
                setPage={setWeeklyPage}
                canLoadMore={canLoadMoreWeekly}
                isWeekly={true}
              />
            )}
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

export default LeaderboardPage;
