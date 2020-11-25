// "use strict";

// *******************************************************************
function Homepage() {

  const [productCards, setProductCard] = React.useState([{}])
  const history = useHistory()


  React.useEffect(() =>{
    console.log('****************** useEffect is running')
    fetch('/recently-added')
    .then(response => response.json())
    .then(data => setProductCard(data));
  },[]);


  function generateProductCards(){
    const cards = productCards.map((product,index) =>(
      <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
        <Card.Img variant="top"  src={product.img_id} />
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Button variant="primary">Favorite</Button>
              <Button variant="primary" onClick={() => handleClick(product.product_id)}>More Info</Button>
        </Card.Body>
      </Card>
      ))
      return cards
  }

  function handleClick(productId){
    history.push({pathname:`/product-page/${productId}`});
  };



    return (
      <React.Fragment>

          <Image src='static/img/begoodyellow.png' fluid />

          <Container>

          <Row>
              <h2>Recently Added Products</h2>
          </Row>

          <Row>{generateProductCards()}</Row>

        </Container>
      </React.Fragment>
    );
  }

//   ReactDOM.render(<App />, document.getElementById('app'));
// ******************************************************************* */
