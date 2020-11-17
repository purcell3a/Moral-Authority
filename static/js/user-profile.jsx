"use strict";
function ShowProfile(props) {

    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setDescription] = React.useState('')

    const [userFromDb, setUserFromDb] = React.useState({})
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    console.log('userinfo=',userFromStorage)
    console.log('userid=',userFromStorage.id)


    React.useEffect(() => {
        let data = {user_id: userFromStorage.id}
        fetch('/get-user-by-id' ,{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}})
          .then(response => response.json())
          // data is the user we are pulling from our db after verifying their info above
          .then(data => {setUserFromDb(data);
            // AS ANDREW WHY THIS IS PRINTING UNDEFINED BUT STILL RENDERING BELOW
            console.log('user=',userFromDb.fname)})
    }, []);


    function handleSubmit(evt){
        evt.preventDefault()
        console.log('data going to /add-product:', fname, lname,email,password, userFromStorage.id)
        let data = {fname:fname, lname:lname, email:email, password:password, user_id: userFromStorage.id }
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
            <Form.Row>

                <Col>
                <Form.Group>
                <label>User Profile</label>
                    <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.fname} value={fname} onChange={handleFnameChange}></input>
                    <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.lname} value={lname} onChange={handleLnameChange}></input>
                    <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.email} value={email} onChange={handlEmailChange}></input>
                    <input type="text" name="product-name" className="form-control"  placeholder= {userFromDb.password} value={password} onChange={handlePasswordChange}></input>
                </Form.Group>
                </Col>
                <Col>
                    <div> maybe products added here</div>
                    <div> maybe favorites added here</div>
                </Col>

            </Form.Row>
            <Form.Row>
                <Col>1 of 3</Col>

                <Col> 2 of 3</Col>

                <Col>
                <Button type="submit">Save Changes</Button>
                </Col>
            </Form.Row>

        </Form>
        </Container>
    </React.Fragment>
     );
   }