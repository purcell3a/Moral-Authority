"use strict";
function ShowProfile(props) {

    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setDescription] = React.useState('')
    const [products, setProducts] = React.useState([{}])
    // const [productClicked, setProductClicked] =React.useState['']
    const [favorites, setFavorites] = React.useState([{}])
    const history = useHistory()
    const [profilePhoto, setprofilePhoto] = React.useState(null)
    const myWidget = cloudinary.createUploadWidget({cloudName: 'purcella',upload_preset: 'ipialmwj',}, (error, result) => { if (result.event == "success") {
      setprofilePhoto(result.info.url) // result.info contains data from upload
    } })

    const [userFromDb, setUserFromDb] = React.useState({})

    console.log('userinfo=',props.user)
    console.log('userid=',props.user.id)


    //  GET PRODUCTS ADDED BY USER
    React.useEffect(() => {
        let data = {'user_id' : props.user.id}
        fetch('/app/user-added-products' ,{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}})
          .then(response => response.json())
          // data is the user we are pulling from our db after verifying their info above
          .then(data => {setProducts(data);
           })
    }, []);

    //  GET USER FAVORITES
    React.useEffect(() => {
        let data = {'user_id' : props.user.id}
        fetch('/app/get-user-favorites' ,{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}})
        .then(response => response.json())
        // data is the user we are pulling from our db after verifying their info above
        .then(data => {setFavorites(data);
        })
    }, []);


    function generateProductCards(){
        const cards = products.map((product,index) =>(
          <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
            <Card.Img variant="top"  src={product.img_id} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Button className='button' variant="primary" onClick={() => HandleFavoriteClick(product.product_id)}>Favorite</Button>
              <Button className='button' variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>More Info</Button>
            </Card.Body>
          </Card>
          ))
          return cards
      }

      function generateFavorites(){
        const cards = favorites.map((product,index) =>(
          <Card style={{ width: '18rem' }} key={index} value={product.product_id}>
            <Card.Img variant="top"  src={product.img_id} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Button className='button' variant="primary" onClick={() => handleRemoveFavorite(product.product_id)}> Remove Favorite</Button>
              <Button className='button' variant="primary" onClick={() => handleMoreInfoClick(product.product_id)}>More Info</Button>
            </Card.Body>
          </Card>
          ))
          return cards
      }

    //  GET MAIN PROFILE DATA
    React.useEffect(() => {
        let data = {'user_id': props.user.id}
        fetch('/app/get-user-by-id' ,{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}})
          .then(response => response.json())
          // data is the user we are pulling from our db after verifying their info above
          .then(data => {setUserFromDb(data);
           })
    }, []);

    function HandleFavoriteClick(productId){
        console.log('productId=',productId,'user_id',props.user.id)
        let data = {product_id:productId,'user_id':props.user.id}
        fetch('/app/add-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data));
    }

    function handleRemoveFavorite(productId){
        console.log('productId=',productId,'user_id',props.user.id)
        let data = {product_id:productId,'user_id':props.user.id}
        fetch('/app/remove-favorite',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data));
    }

    function handleSubmit(evt){
        evt.preventDefault()
        console.log('data going to /change-user-data', fname, lname,email,password, props.user.id)
        let data = {fname:fname, lname:lname, email:email, password:password, 'user_id':props.user.id, profilePhoto:profilePhoto}
        fetch('/app/change-user-data',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {
            if (data.status == 'Account Updated'){
                props.setUser({'fname':data.user.fname, 'id': data.user.id})
                localStorage.setItem('user',JSON.stringify({'fname':data.user.fname, 'id': data.user.id}));
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

        <Jumbotron fluid>
            <Container className="profilecontainer">
                  <Row>
                    <Col sm={4}>
                      <Card style={{ width: '18rem' }} className="card profile-card-3">

                            <div className="background-block">
                                <Card.Img src={userFromDb.profile_img} alt="profile-sample1" className="background"/>
                            </div>

                            <div className="profile-thumb-block">
                              <Image src={userFromDb.profile_img} alt="profile-image" className="profile"></Image>
                            </div>

                            <Card.Title className="card-content">
                                <h2>{userFromDb.fname} {userFromDb.lname}</h2>
                                <small>{userFromDb.email}</small>
                            </Card.Title>
                      </Card>
                    </Col>

                  <Col sm={8}>
                      <Tabs defaultActiveKey="Account" id="uncontrolled-tab-example">

                        <Tab eventKey="Account" title="Account">

                        <Form onSubmit={handleSubmit}>

                        <Form.Group>
                        <Form.Row>
                            <Col>
                              <Form.Control placeholder= {userFromDb.fname} value={fname} onChange={handleFnameChange} />
                            </Col>
                            <Col>
                              <Form.Control  placeholder= {userFromDb.lname} value={lname} onChange={handleLnameChange} />
                            </Col>
                          </Form.Row>
                        </Form.Group>

                        <Form.Group>
                        <Form.Row>
                          <Col>
                          <Form.Control  placeholder= {userFromDb.email} value={email} onChange={handlEmailChange} />
                          </Col>
                          <Col>
                          <Form.Control  placeholder= {userFromDb.password} value={password} onChange={handlePasswordChange} />
                          </Col>
                            </Form.Row>
                        </Form.Group>

                          <Form.Group>
                          <Form.Row>
                          <Col>
                             <Button className='button'type="submit">Save Changes</Button>
                          </Col>
                        </Form.Row>
                          </Form.Group>
                        </Form>

                        <Button className='button' id="upload_widget" className="cloudinary-button"  onClick={()=> {myWidget.open()}}>Update Profile Photo</Button>
                        </Tab>

                          <Tab eventKey="Favorites" title="Favorites">
                          {generateFavorites()}
                          </Tab>

                          <Tab eventKey="Products" title="Products">
                              {generateProductCards()}
                          </Tab>

                          <Tab eventKey="AddProduct" title="AddProduct">
                          <AddProduct />
                          </Tab>

                      </Tabs>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    </React.Fragment>
     );
   }