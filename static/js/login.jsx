"use strict";

function Login(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const history = useHistory()


  function handleSubmit(evt){
    evt.preventDefault()
    let data = {email:email, password:password}
    fetch('/login' ,{method: "POST",  body: JSON.stringify(data),  headers: {
      'Content-Type': 'application/json'}})
      .then(response => response.json())
      // data is the user we are pulling from our db after verifying their info above
      .then(data => {
        if (data !== 'not logged in'){
          props.setUser(data)
          localStorage.setItem('user',(data));
          history.push('/');
        }else{
          alert('Ivalid Username or Password')
        }
    console.log('hi')
      });

  }


  function handleEmailChange(evt){
    setEmail(evt.target.value)


  }

  function handlePasswordChange(evt){
    setPassword(evt.target.value)


  }

    return (

      <React.Fragment>
          <Container>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" name="login-email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name="login-password"  placeholder="Password" value={password} onChange={handlePasswordChange}></Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
      </React.Fragment>
    );
  }

