"use strict";

function Shop(){

    const [productCards, setProductCard] = React.useState([{}])
    const history = useHistory()

    React.useEffect(() =>{
      console.log('****************** useEffect is running')
      fetch('/return-products')
      .then(response => response.json())
      .then(data => setProductCard(data));
    },[]);
    console.log('productcards:',productCards);
  
    // when the product is clicked on - set that product id to state and send it with redirect 
    function handleClick(productId){
      history.push({pathname:`/product-page/${productId}`});
      };


    function generateProductCards(){
      const cards = productCards.map((product,index) =>(
        <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
          <Card.Img variant="top"  src="https://www.pcmedicalllc.com/images/ecommerce/no-img-med.jpg" />
          <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Button variant="primary" onClick={() => handleClick(product.product_id)}>Go somewhere</Button>
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