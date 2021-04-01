import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./_styles.scss";

const UsersTable = ({ users = [], loaderRef, totalUsers }) => {
  return (
    <>
      <div className="users-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Repos</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length !== 0 &&
              users.map((user, index) => <UserRow key={index} user={user} />)}
          </tbody>
        </Table>
      </div>
      {users?.length !== totalUsers && (
        <div className="loading" ref={loaderRef}>
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
};

const UserRow = ({ user = {} }) => (
  <tr className="user-block">
    <td>
      <img src={user?.avatar_url} alt="avatar" />
    </td>
    <td>
      <Link
        to={(location) => ({ ...location, pathname: `/user/${user?.login}` })}
      >
        <p>{user?.login}</p>
      </Link>
    </td>
    <td>
      <a href={user?.repos_url} target="_blank" rel="noreferrer">
        {user?.repos_url}
      </a>
    </td>
  </tr>
);

export default UsersTable;
