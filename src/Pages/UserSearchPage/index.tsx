import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import MainLayout from "../../layout/MainLayout";
import { SearchBar, UsersTable } from "../../components";
import { UserItem } from "../../types";
import "./_styles.scss";

const UserSearchPage = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [searchString, setSearchString] = useState<string | null | undefined>(
    ""
  );
  const [page, setPage] = useState<number>(1);
  const userSearchLoadRef = useRef<HTMLDivElement>(null);

  const getUsersAction = async (
    searchString: string,
    page: number,
    isNewSearch = false
  ) => {
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

  const handleObserver = (entities: any) => {
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
    if (page > 1 && searchString) {
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
      sessionStorage.setItem("search", searchString || "");
    }
  }, [searchString]);

  return (
    <MainLayout>
      <Container className="user-search-page">
        <h2>User search page</h2>
        <h3>Users ({totalUsers})</h3>
        <SearchBar
          searchString={searchString || ""}
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
