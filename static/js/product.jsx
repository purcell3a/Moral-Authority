"use strict";

function ShowProduct(){

  const [productCards, setProductCard] = React.useState('')


    React.useEffect(() =>{
      console.log('******************')
      fetch('/return-products')
      .then((response) => {
        response.json();
        })
      .then((data) => {
        let allproducts = data.map( Product =>{
          return{title: Product.title, description: Product.description}
        });
      });
    },[]);



    function generateProductCards(){
      const cards = productCards.Products.map((Product,index) =>(
        <Card style={{ width: '18rem' }} key={index} value={Product.title}>
          <Card.Img variant="top" src="static/img/logo.png" />
          <Card.Body>
              <Card.Title>{Product.title}</Card.Title>
              <Card.Text>
                {Product.description}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        ))
        return cards
    }

    return (
      <React.Fragment>

        <Container>
          <Row>
            <Col>1 of 2</Col>
            <Col>{generateProductCards()}</Col>
          </Row>
        </Container>

      </React.Fragment>
    );
}