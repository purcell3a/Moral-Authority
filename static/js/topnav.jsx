"use strict";

function TopNav(props){


    const history = useHistory()


    function handleSubmit(evt){
      evt.preventDefault()
      localStorage.removeItem('user');
      props.setUser()
      console.log('logged out')
      history.push('/');
    }

    return(
        <Navbar bg="light" expand="md">
             <Navbar.Brand><Link to='/'><img
                    src="/static/img/logo.png"
                    width="250"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Link>
            </Navbar.Brand>


            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link><Link to="/app/shop"> Shop</Link></Nav.Link>
                    <Nav className="mr-auto">
                        {props.user?'':<Nav.Link><Link to="/app/signup">Login | Signup</Link></Nav.Link>}
                        {props.user?
                        <NavDropdown title= {props.user.fname} id="basic-nav-dropdown">
                                <NavDropdown.Item><Link to="/app/user-profile">Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item><Button onClick={handleSubmit} variant="light">Logout</Button></NavDropdown.Item>
                        </NavDropdown>:''}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>

    );
}
