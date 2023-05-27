import { Link } from "react-router-dom";

const MonthLeaderboard = ({ dataLeaderboard }) => {
  
  return (
    <div className="month-leaderboard-container">
      <div className="month-leaderboard">
        <h2>Classement du mois</h2>
        <ol>
          {Object.entries(dataLeaderboard.classementMonth).map(([place, user]) => (
            <Link to={`/profile/${user[0]}`} key={place}>
              <li className="userBox">
                <div className="userBox-left">
                  <div className="userBoxRank">
                    <span>{place}.</span>
                  </div>
                  <div className="userBoxImage">
                    <img src={user[2]} alt={user[0]} />
                  </div>
                  <div className="userBoxName">
                    <span className="username">{user[0]}</span>
                  </div>
                </div>
                <div className="userBox-right">
                  <div className="userBoxXP">
                    <span className="username">{user[1]} ✨</span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MonthLeaderboard;