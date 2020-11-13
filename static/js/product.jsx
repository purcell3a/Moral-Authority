"use strict";

function ShowProduct() {

  function ProductCard(){
    return(
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="static/img/logo.png" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    )
  }


    return (
    <React.Fragment>

      <Container>
        <Row>
          {ProductCard()}
        </Row>
      </Container>

    </React.Fragment>
  );
}