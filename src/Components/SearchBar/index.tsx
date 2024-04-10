import "./_styles.scss";

type SearchBarProps = {
  setSearchString: (_: string) => void;
  searchString: string;
};

export const SearchBar = ({
  setSearchString,
  searchString,
}: SearchBarProps) => {
  return (
    <div className="user-search-bar d-flex flex-column justify-content-center">
      <input
        placeholder="search string"
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  );
};
