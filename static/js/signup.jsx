"use strict";

  function Signup() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')

    function handleSubmit(evt){
      evt.preventDefault()
      console.log('hi')

    let data = {email:email, password:password, fname:fname, lname:lname}
    fetch('/signup',{method: "POST",  body: JSON.stringify(data),  headers: {
      'Content-Type': 'application/json'}} )
    .then(response => response.json())
    .then(data => console.log(data));
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
                    Login goes here
                </Col>
                <Col>
                  <Form onSubmit={handleSubmit}>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" name="fname" placeholder="First" value={fname} onChange={handleFnameChange} />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Control type="text" name="lname"  placeholder="Last" value={lname} onChange={handleLnameChange}></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Control type="email" name="email"  placeholder="email" value={email} onChange={handleEmailChange}></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
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