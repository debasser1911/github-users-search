import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import MainLayout from "../../layout/MainLayout";
import { SearchBar, UsersTable } from "../../components";
import { UserItem } from "../../types";
import { githubClient } from "../../api/api";
import { SESSION_STORAGE_SEARCH } from "../../utils/constants";
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
    const response = await githubClient().get(
      `/search/users?q=${searchString}&page=${page}`
    );
    setTotalUsers(response.data.total_count);
    if (isNewSearch) {
      setUsers(response.data.items);
    } else {
      setUsers((prev) => [...prev, ...response.data.items]);
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
    setSearchString(sessionStorage.getItem(SESSION_STORAGE_SEARCH));
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
  }, [userSearchLoadRef.current]);

  useEffect(() => {
    if (page > 1 && searchString) {
      getUsersAction(searchString, page);
    }
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
      sessionStorage.setItem(SESSION_STORAGE_SEARCH, searchString || "");
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
