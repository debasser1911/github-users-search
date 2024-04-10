import { Col, Container, Row } from "react-bootstrap";
import { useRedirect } from "../../utils/hooks";
import "./_styles.scss";

export const Header = () => {
  let redirect = useRedirect();
  return (
    <header>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <h2 onClick={() => redirect("/")}>Github searcher</h2>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
