import "./_styles.scss";

const UserRow = ({ user = {}, setSelectedUser, setUserModalOpen }) => (
  <tr
    className="user-block"
    onClick={() => {
      setUserModalOpen(true);
      setSelectedUser(user);
    }}
  >
    <td>
      <img src={user?.avatar_url} alt="avatar" />
    </td>
    <td>
      <p>{user?.login}</p>
    </td>
    <td>
      <span>{user?.repos_url}</span>
    </td>
  </tr>
);

export default UserRow;
