import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { SearchBar } from "../SearchBar";
import { RepoItem, UserItem } from "../../types";
import "./_styles.scss";

export const ReposTable = ({ user }: { user: UserItem }) => {
  const [repositories, setRepositories] = useState<RepoItem[]>([]);
  const [filtered, setFiltered] = useState<RepoItem[]>([]);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const getReposAction = async (page: number) => {
    const response = await axios.get(`${user.repos_url}?page=${page}`);

    if (response.data) {
      setRepositories((prev) => [...prev, ...response.data]);
    }
  };

  useEffect(() => {
    (async () => {
      if (Object.keys(user).length) {
        getReposAction(page);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setFiltered(repositories);
  }, [repositories]);

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (filtered.length < user.public_repos) {
        setPage((page) => {
          let newPage = page + 1;
          return newPage;
        });
      }
    }
  };

  useEffect(() => {
    if (loaderRef.current) {
      let options = {
        root: null,
        rootMargin: "50px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(handleObserver, options);
      observer.observe(loaderRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderRef.current]);

  useEffect(() => {
    (async () => {
      if (page > 1) {
        getReposAction(page);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (typeof searchString === "string" && repositories) {
      setFiltered(
        repositories.filter((repo) =>
          repo.name.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  return (
    <>
      <h3>Search in repositories list</h3>
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Table>
        <thead>
          <tr>
            <th>Repository name</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {filtered?.map((repo, index) => (
            <RepoRow repo={repo} key={index} />
          ))}
        </tbody>
      </Table>
      {user?.public_repos !== filtered?.length && !searchString && (
        <div className="loading" ref={loaderRef}>
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
};

type RepoRowProps = {
  repo: RepoItem;
};

const RepoRow = (props: RepoRowProps) => {
  const { repo } = props;

  return (
    <tr className="repo-row">
      <td>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
      </td>

      <td className="repo-row_repo-info">
        <span>Stars {repo.stargazers_count}</span>
        Forks {repo.forks_count}
      </td>
    </tr>
  );
};
