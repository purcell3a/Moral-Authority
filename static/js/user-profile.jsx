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
            <Card.Img variant="top"  src={product.img_id} />
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
       <Container>

                  <Col>
                  <Card style={{ width: '18rem' }}>
                  <div class="card profile-card-3">
    		          <div class="background-block">
    		            <Card.Img src={userFromDb.profile_img} alt="profile-sample1" class="background"/>
    		          </div>
    		          <div class="profile-thumb-block">
    		            <img src={userFromDb.profile_img} alt="profile-image" class="profile"/>
    		          </div>
    		          <div class="card-content">
                    <Card.Title>
                    <h2>{userFromDb.fname} {userFromDb.lname}<small>Designer</small></h2>
                    </Card.Title>
                    <div class="icon-block"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-google-plus"></i></a></div>
                    </div>
                    </div>
                  </Card>

                  {/* <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card> */}


                  </Col>

                  <Col>
                      <Tabs defaultActiveKey="Account" id="uncontrolled-tab-example">

                        <Tab eventKey="Account" title="Account">

                        <Form onSubmit={handleSubmit}>

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
                        </Form>
                        <Button id="upload_widget" className="cloudinary-button"  onClick={()=> {myWidget.open()}}>Update Profile Photo</Button>
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

        </Container>
    </React.Fragment>
     );
   }