"use strict";


// const {Container, Row, Col, Button} = ReactBootstrap


function ShowProduct() {
    return (
    <React.Fragment>

      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>

    </React.Fragment>
  );
}