import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./_styles.scss";
import MainLayout from "../../layout/MainLayout";
import { UserItem } from "../../types";
import { ReposTable } from "../../components";

const UserPage = () => {
  const [user, setUser] = useState<UserItem | undefined>(undefined);
  const searchedUser = useParams<{ userLogin: string }>();

  useEffect(() => {
    if (searchedUser) {
      axios
        .get(`https://api.github.com/users/${searchedUser.userLogin}`)
        .then((res) => {
          setUser(res.data);
        });
    }
  }, [searchedUser]);

  return (
    <MainLayout>
      <Container className="user-page">
        {user ? (
          <>
            <Row>
              <Col className="d-flex justify-content-center">
                <img src={user.avatar_url} alt="avatar" />
              </Col>
              <Col className="d-flex flex-column user-page_user-info-block">
                <span>
                  Login <strong>{user.login}</strong>
                </span>
                <span>
                  Followers <strong>{user.followers}</strong>
                </span>
                <span>
                  Following <strong>{user.following}</strong>
                </span>
                <span>
                  E-Mail <strong>{user.email}</strong>
                </span>
                <span>
                  Location <strong>{user.location}</strong>
                </span>
                <span>
                  User created{" "}
                  {/* <strong>{new Date().toUTCString(user.created_at)}</strong> */}
                </span>
                <span>
                  Bio <strong>{user.bio}</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <ReposTable user={user} />
              </Col>
            </Row>
          </>
        ) : (
          "loading..."
        )}
      </Container>
    </MainLayout>
  );
};
export default UserPage;
