import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../../Components/SearchBar";
import UsersTable from "../../Components/UsersTable";
import MainLayout from "../../Layout/MainLayout";
import "./_styles.scss";

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const userSearchLoadRef = useRef(null);

  const getUsersAction = async (searchString, page, isNewSearch = false) => {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchString}&page=${page}`
    );

    if (response.data) {
      setTotalUsers(response.data.total_count);
      if (isNewSearch) {
        setUsers(response.data.items);
      } else {
        setUsers((prev) => [...prev, ...response.data.items]);
      }
    }
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (users.length < totalUsers) {
        setPage((page) => {
          let newPage = page + 1;
          return newPage;
        });
      }
    }
  };

  useEffect(() => {
    setSearchString(sessionStorage.getItem("search"));
  }, []);

  useEffect(() => {
    if (userSearchLoadRef.current) {
      let options = {
        root: null,
        rootMargin: "200px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(handleObserver, options);
      observer.observe(userSearchLoadRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSearchLoadRef.current]);

  useEffect(() => {
    if (page > 1) {
      getUsersAction(searchString, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (searchString) {
      setPage(1);
      getUsersAction(searchString, 1, true);
    } else {
      setUsers([]);
      setTotalUsers(0);
    }
    if (searchString !== null) {
      sessionStorage.setItem("search", searchString);
    }
  }, [searchString]);

  return (
    <MainLayout>
      <Container className="user-search-page">
        <h2>User search page</h2>
        <h3>Users ({totalUsers})</h3>
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <UsersTable
          users={users}
          loaderRef={userSearchLoadRef}
          totalUsers={totalUsers}
        />
      </Container>
    </MainLayout>
  );
};
export default UserSearchPage;
