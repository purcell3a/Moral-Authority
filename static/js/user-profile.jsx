"use strict";
function ShowProfile(props) {

    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setDescription] = React.useState('')
    const [products, setProducts] = React.useState([{}])
    // const [productClicked, setProductClicked] =React.useState['']
    const [favorites, setFavorites] = React.useState([{}])

    const [userFromDb, setUserFromDb] = React.useState({})
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    console.log('userinfo=',userFromStorage)
    console.log('userid=',userFromStorage.id)


//  GET PRODUCTS ADDED BY USER
    React.useEffect(() => {
        let data = {user_id: userFromStorage.id}
        fetch('/user-added-products' ,{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}})
          .then(response => response.json())
          // data is the user we are pulling from our db after verifying their info above
          .then(data => {setProducts(data);
           })
    }, []);

//  GET USER FAVORITES
    React.useEffect(() => {
        let data = {user_id: userFromStorage.id}
        fetch('/get-user-favorites' ,{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}})
        .then(response => response.json())
        // data is the user we are pulling from our db after verifying their info above
        .then(data => {setFavorites(data);
        })
    }, []);


    function generateProductCards(){
        const cards = products.map((product,index) =>(
          <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
            <Card.Img variant="top"  src="https://ak1.ostkcdn.com/images/products/is/images/direct/253a2005917bd95dc5e7d696323012f2aa5164b6/Team-Fortress-2-Balloonicorn-11%22-Plush-Doll.jpg" />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Button variant="primary" onClick={() => HandleFavoriteClick(product.product_id)}>Favorite</Button>
              <Button variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>More Info</Button>
            </Card.Body>
          </Card>
          ))
          return cards
      }

      function generateFavorites(){
        const cards = favorites.map((product,index) =>(
          <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
            <Card.Img variant="top"  src="https://ak1.ostkcdn.com/images/products/is/images/direct/253a2005917bd95dc5e7d696323012f2aa5164b6/Team-Fortress-2-Balloonicorn-11%22-Plush-Doll.jpg" />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Button variant="primary" onClick={() => handleRemoveFavorite(product.product_id)}> Remove Favorite</Button>
              <Button variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>More Info</Button>
            </Card.Body>
          </Card>
          ))
          return cards
      }

    //  GET MAIN PROFILE DATA
    React.useEffect(() => {
        let data = {user_id: userFromStorage.id}
        fetch('/get-user-by-id' ,{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}})
          .then(response => response.json())
          // data is the user we are pulling from our db after verifying their info above
          .then(data => {setUserFromDb(data);
           })
    }, []);

    function HandleFavoriteClick(productId){
        console.log('productId=',productId,'user_id',userFromStorage.id)
        let data = {product_id:productId,user_id:userFromStorage.id}
        fetch('/add-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data));
    }

    function handleRemoveFavorite(productId){
        console.log('productId=',productId,'user_id',userFromStorage.id)
        let data = {product_id:productId,user_id:userFromStorage.id}
        fetch('/remove-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data));
    }

    function handleSubmit(evt){
        evt.preventDefault()
        console.log('data going to /change-user-data', fname, lname,email,password, userFromStorage.id)
        let data = {fname:fname, lname:lname, email:email, password:password, user_id: userFromStorage.id}
        fetch('/change-user-data',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {
            if (data == 'Account Updated'){
                props.setUser(JSON.stringify({'fname':fname, 'id': userFromStorage.id}))
                localStorage.setItem('user',JSON.stringify({'fname':fname, 'id': userFromStorage.id}));
                history.push('/');
            }else{
                alert('Info not able to update')
            }
        console.log(data);
        });
    }

    function handleMoreInfoClick(productId){
        history.push({pathname:`/product-page/${productId}`});
    };

    function handleFnameChange(evt){
        setFname(evt.target.value)
    }


    function handleLnameChange(evt){
        setLname(evt.target.value)
    }


    function handlEmailChange(evt){
        setEmail(evt.target.value)
    }


    function handlePasswordChange(evt){
        setDescription(evt.target.value)
    }


    return (
     <React.Fragment>
       <Container>
        <Form onSubmit={handleSubmit}>

          <Row>

          <Col>

                  <Form.Group>
                  <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.fname} value={fname} onChange={handleFnameChange}></input>
                  </Form.Group>

                  <Form.Group>
                  <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.lname} value={lname} onChange={handleLnameChange}></input>
                  </Form.Group>

                  <Form.Group>
                  <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.email} value={email} onChange={handlEmailChange}></input>
                  </Form.Group>

                  <Form.Group>
                  <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.password} value={password} onChange={handlePasswordChange}></input>
                  </Form.Group>
                  <Form.Group>
                  <Button type="submit">Save Changes</Button>
                  </Form.Group>
                  </Col>

                  <Col>


                      <Tabs defaultActiveKey="Products" id="uncontrolled-tab-example">
                          <Tab eventKey="Favorites" title="Favorites">
                          {generateFavorites()}
                          </Tab>
                          <Tab eventKey="Products" title="Products">
                              {generateProductCards()}
                          </Tab>

                      </Tabs>

                  </Col>
          </Row>
        </Form>
        </Container>
    </React.Fragment>
     );
   }