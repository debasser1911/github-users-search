import "./_styles.scss";

const UserSearchBar = ({ setSearchString, searchString = "" }) => {
  
  return (
    <div className="user-search-bar d-flex flex-column justify-content-center">
      <input
        type="text"
        defaultValue={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  );
};
export default UserSearchBar;
