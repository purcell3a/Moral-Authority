"use strict";

  function Signup(props) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')
    const history = useHistory()

    function handleSubmit(evt){
      evt.preventDefault()
      let data = {email:email, password:password, fname:fname, lname:lname}
      fetch('/signup',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => {
          if (data == 'account created'){
            alert('account created, please login')
          }else{
            alert('invalid email or password')
          }
        });
          console.log(data);
      }


    function handleEmailChange(evt){
      setEmail(evt.target.value)
    }


    function handlePasswordChange(evt){
      setPassword(evt.target.value)
    }


    function handleFnameChange(evt){
      setFname(evt.target.value)
    }


    function handleLnameChange(evt){
      setLname(evt.target.value)
    }


      return (

        <React.Fragment>

            <Container>
              <Row>
                1 of 3
              </Row>
              <Row>
                <Col>
                <Login setUser={props.setUser}/>
                </Col>
                <Col>
                  <Form onSubmit={handleSubmit}>

                      <Form.Group controlId="formBasicfname">
                        <Form.Control type="text" name="fname" placeholder="First" value={fname} onChange={handleFnameChange}></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formBasiclname">
                        <Form.Control type="text" name="lname"  placeholder="Last" value={lname} onChange={handleLnameChange}></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formBasicemail">
                        <Form.Control type="email" name="email"  placeholder="email" value={email} onChange={handleEmailChange}></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formSignupPassword">
                        <Form.Control type="password" name="password"  placeholder="password" value={password} onChange={handlePasswordChange}></Form.Control>
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Register
                      </Button>

                  </Form>
                </Col>
              </Row>
              <Row>
                3 of 3
              </Row>

            </Container>
          </React.Fragment>
        );
}