// "use strict";

// *******************************************************************
function Homepage(props) {

  const [productCards, setProductCards] = React.useState([])
  const history = useHistory()


  React.useEffect(() =>{
    let user_id = props.user? props.user.id:'0'
    let data = {user_id}
 
    fetch('/api/recently-added',
    {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => setProductCards(data));
  },[]);


  function get_recently_added_products(){
    let user_id = props.user? props.user.id:'0'
    let data = {user_id}
    fetch('/api/recently-added',
    {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => setProductCards(data));
  }


  function generateProductCards(){
    const cards = productCards.map((product,index) =>(

          <Card key={product.product_id.toString() + product.product_favorite} value={product.product_id}>

            <Card.Img variant="top"  src={product.img_id}/>

            <Card.Body>

              <Card.Title>
                <i className={product.product_favorite === 'True'?  "red fa-heart" : "white fa-heart"} onClick={() => handleFavoriteClick(product.product_id)}></i>
                <div className='truncate-description'>{product.title}</div>
              </Card.Title>

              <small>{product.company}</small>

              <Card.Text className='truncate-description'>
                {product.description}
              </Card.Text>

              <Button className="more-info-button" variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>
                More Info
              </Button>

            </Card.Body>

          </Card>
      ))
      return cards
  }


  function handleFavoriteClick(productId){
    let user_id = props.user? props.user.id:alert('Please Log In To Favorite')
    let data = {'product_id':productId,'user_id':user_id}
    fetch('/api/toggle-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
      'Content-Type': 'application/json'}} )
    .then(response => response.json())
    .then(data => {console.log(data)
      get_recently_added_products()});
  }


  function handleMoreInfoClick(productId){
    history.push({pathname:`/product-page/${productId}`});
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

          <Row className="subtitle">
              <h2 className='recently-added' variant="secondary">Trusted Certifications</h2>
          </Row>

          <Row className="certification-container">
            <Image className='certlogo' src="static/img/logos/bcorplogo.png"></Image>
            <Image className='certlogo' src="static/img/logos/ewgologo.png"></Image>
            <Image className='certlogo' src="static/img/logos/fairtradelogo.png"></Image>
            <Image className='certlogo' src="static/img/logos/leapingbunnylogo.png"></Image>
            <Image className='certlogo' src="static/img/logos/mbe.png"></Image>
          </Row>

      </React.Fragment>
    );
  }

