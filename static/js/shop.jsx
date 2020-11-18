"use strict";

function Shop(){

    const [productCards, setProductCard] = React.useState([{}])
    const [selectedCategory, setselectedCategory] = React.useState('');
    const [certBcorp, setCertBcorp] = React.useState('');
    const [certEWG, setCertEWG] = React.useState('');
    const [certFairtrade, setCertFairtrade] = React.useState('');
    const [certLeapingBunny, setCertLeapingBunny] = React.useState('');
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

    function handleLeapingBunnySelect(evt){
      setCertLeapingBunny(evt.target.value)
    }

    function handleFairTradeSelect(evt){
      setCertFairtrade(evt.target.value)
    }

    function handleEWGSelect(evt){
      setCertEWG(evt.target.value)
    }

    function handleBcorpSelect(evt){
      setCertBcorp(evt.target.value)
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

    function handleSubmit(evt){
      evt.preventDefault()
        let data = {category:selectedCategory,Bcorp:certBcorp,category:certEWG,category:selectedCategory,category:selectedCategory}
      }


    // function handleSubmit(evt){
    //   evt.preventDefault()
    //   let data = {email:email, password:password, fname:fname, lname:lname}
    //   fetch('/signup',{method: "POST",  body: JSON.stringify(data),  headers: {
    //     'Content-Type': 'application/json'}} )
    //   .then(response => response.json())
    //   .then(data => {
    //       if (data == 'account created'){
    //         alert('account created, please login')
    //         history.push('/')
    //       }else{
    //         alert('invalid email or password')
    //       }
    //     });
    //       console.log(data);
    //   }

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
                    <Form.Group>
                    <Form.Check label="Bcorp" onSelect={handleBcorpSelect} value={certBcorp}/>
                    <Form.Check label="EWG" onSelect={handleEWGSelect} value={certEWG}/>
                    <Form.Check label="FairTrade" onSelect={handleFairTradeSelect} value={certFairtrade}/>
                    <Form.Check label="LeapingBunny" onSelect={handleLeapingBunnySelect} value={certLeapingBunny}/>
                    </Form.Group>

                    <Form.Group>
                      <Nav.Link eventKey="link-2">Link</Nav.Link>
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