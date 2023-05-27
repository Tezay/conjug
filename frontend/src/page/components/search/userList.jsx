import { Link } from "react-router-dom";

const UserList = ({dataSearch}) => {

  return (
    <>
      <div className="userList">
        <ol>
          {Object.entries(dataSearch.utilisateurs).map(([user, image]) => (
            <Link to={`/profile/${user}`} key={user}>
              <li className="userBox">
                <div className="userBoxImage">
                  <img src={image} alt={user} />
                </div>
                <div className="userBoxName">
                  <span className="username">{user}</span>
                </div>
              </li>
            </Link>
          ))}
        </ol>
      </div>
    </>
  );

};

export default UserList;