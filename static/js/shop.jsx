"use strict";

function Shop(){

    const [productCards, setProductCard] = React.useState([{}])
    const [selectedCategory, setselectedCategory] = React.useState('');
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

    function handleCategorySelect(evt){
      setselectedCategory(evt.target.value)
      }

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
    function generateDepartments(){
      const departments = ['Beauty|Health','Clothing|Shoes|Accessories','Home|Garden'].map((dep, index) => (
          <Dropdown.Item key={index} value={dep}>{dep}</Dropdown.Item>
      ))
      return departments
    }


    return (
      <React.Fragment>

        <Container>
          <Row>


            <Col xs={6} md={4}>
              <Form>
                <Nav defaultActiveKey="/product-search" className="flex-column">


                    <Form.Group>
                    <DropdownButton id="dropdown-basic-button" title="Department" onChange={handleCategorySelect} value={selectedCategory}>
                          {generateDepartments()}
                    </DropdownButton>
                    </Form.Group>

                      {/* #we can map this given categories in db */}
                    <Form.Check label="Remember me" />

                    <Form.Group>
                      <Nav.Link href="/home">Active</Nav.Link>
                      <Nav.Link eventKey="link-1">Link</Nav.Link>
                      <Nav.Link eventKey="link-2">Link</Nav.Link>
                      <Nav.Link eventKey="disabled" disabled>
                        Disabled
                      </Nav.Link>
                    </Form.Group>
                  </Nav>
                  <Button type='submit'>Search</Button>
              </Form>
            </Col>


            <Col xs={12} md={8}>{generateProductCards()}</Col>
          </Row>
        </Container>

      </React.Fragment>
    );
}