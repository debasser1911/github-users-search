import "./_styles.scss";

const SearchBar = ({ setSearchString, searchString = "" }) => {
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
export default SearchBar;
