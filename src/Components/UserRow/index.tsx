import { UserItem } from "../../types";
import "./_styles.scss";

type UserRowProps = {
  user: UserItem;
  setSelectedUser: (user: UserItem) => void;
  setUserModalOpen: (_: boolean) => void;
};

export const UserRow = ({
  user,
  setSelectedUser,
  setUserModalOpen,
}: UserRowProps) => (
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
