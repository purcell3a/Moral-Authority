"use strict";

function Login(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const history = useHistory()


  function handleSubmit(evt){
    evt.preventDefault()
    let data = {email:email, password:password}
    fetch('/api/login' ,
    {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => {
      if (data !== 'info does not match'){
        props.setUser(data)
        localStorage.setItem('user',JSON.stringify(data));
        history.push('/');
      }else{
        alert('Invalid Username or Password')
      }
      console.log(data)
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

                <Form id="loginform" onSubmit={handleSubmit}>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email"
                                  name="login-email"
                                  placeholder="Enter email"
                                  value={email}
                                  onChange={handleEmailChange} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password"
                                  name="login-password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={handlePasswordChange}></Form.Control>
                  </Form.Group>

                  <Row id='login-button-row'>

                      <Button id='login-button'
                              variant="primary"
                              type="submit">
                        Login
                      </Button>

                  </Row>

                </Form>

      </React.Fragment>
    );
  }

