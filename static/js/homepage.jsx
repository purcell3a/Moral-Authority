// "use strict";

// *******************************************************************
function Homepage(props) {

  const [productCards, setProductCard] = React.useState([{}])
  const history = useHistory()


  function get_recently_added_products(){
    console.log('****************** useEffect is running')
    fetch('/app/recently-added')
    .then(response => response.json())
    .then(data => setProductCard(data));
  } 

  React.useEffect(() =>{
    console.log('****************** useEffect is running')
    fetch('/app/recently-added')
    .then(response => response.json())
    .then(data => setProductCard(data));
  },[]);


  function generateProductCards(){
    const cards = productCards.map((product,index) =>(
      <Card key={index} value={product.product_id}>
      <Card.Img variant="top"  src={product.img_id}/>
      {console.log(product.img_id)}
      <Card.Body>
          <Card.Title>{product.title} 
          <i className={product.product_favorite === 'True'?  "red fa-heart" : "white fa-heart"} onClick={() => handleFavoriteClick(product.product_id)}></i>
          </Card.Title>
          <small>{product.company}</small>
          <Card.Text>
            {product.description}
          </Card.Text>
          <Button className="more-info-button" variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>More Info</Button>
      </Card.Body>
    </Card>
      ))
      return cards
  }


  function handleFavoriteClick(productId){
    console.log('productId=',productId,'user_id',props.user.id)
    let data = {'product_id':productId,'user_id':props.user.id}
    fetch('/app/toggle-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
      'Content-Type': 'application/json'}} )
    .then(response => response.json())
    .then(data => {console.log(data)
      get_recently_added_products()});
  }


  function handleMoreInfoClick(productId){
    history.push({pathname:`/app/product-page/${productId}`});
  };

    return (
      <React.Fragment>



          <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="static/img/rightchoice1.png"
                    alt="First slide"
                  />
                </Carousel.Item>


                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="static/img/rightchoice2.png"
                    alt="Third slide"
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="static/img/rightchoice3.png"
                    alt="Third slide"
                  />
                </Carousel.Item>
          </Carousel>

          <Row className="subtitle">
              <h2 className='recently-added' variant="secondary">Recently Added Products</h2>
          </Row>

          <Row className="recently-added-container">{generateProductCards()}</Row>

      </React.Fragment>
    );
  }

//   ReactDOM.render(<App />, document.getElementById('app'));
// ******************************************************************* */
