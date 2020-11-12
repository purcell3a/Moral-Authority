"use strict";
function ShowProfile() {
    return (
     <React.Fragment>

        <Container>
            <Row>

                <Col>
                    <label>User Profile</label>
                    <div>name here</div>
                    <div>email here</div>
                </Col>
                <Col>
                    <div> maybe products added here</div>
                    <div> maybe favorites added here</div>
                </Col>

            </Row>
            <Row>
                <Col>1 of 3</Col>

                <Col> 2 of 3</Col>

                <Col>3 of 3</Col>
            </Row>
        </Container>
    </React.Fragment>
     );
   }
