import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./_styles.scss";

export const Header = () => {
  return (
    <header>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Link to={"/"}>Github searcher</Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
