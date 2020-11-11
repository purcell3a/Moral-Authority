"use strict";
const {Container, Row, Col, Button} = ReactBootstrap
function ShowProduct() {
    return (
    <React.Fragment>

        <Container>
        <Row>
            <Col>
            <div className="mb-2">
              <Button variant="primary" size="lg">
                Large button
              </Button>{' '}
              <Button variant="secondary" size="lg">
                Large button
              </Button>
            </div>
          </Col>
        </Row>
        </Container>
      </React.Fragment>
    );
  }