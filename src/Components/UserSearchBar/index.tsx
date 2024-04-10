import "./_styles.scss";

type UserSearchBarProp = {
  setSearchString: (value: string) => void;
  searchString: string;
};

export const UserSearchBar = ({
  setSearchString,
  searchString = "",
}: UserSearchBarProp) => {
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
