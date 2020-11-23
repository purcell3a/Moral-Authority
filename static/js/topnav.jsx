"use strict";

function TopNav(props){
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link to='/'><img
                    src="/static/img/logo.png"
                    width="250"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Link>
            </Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
            <Nav.Link><Link to="/shop"> Shop</Link></Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {props.user?'':<Nav.Link><Link to="/signup">Login | Signup</Link></Nav.Link>}
                        {props.user?
                        <NavDropdown title= {props.user.fname} id="basic-nav-dropdown">
                                <NavDropdown.Item><Link to="/user-profile">Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/add-product">AddProduct </Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item><Link to="/logout">Logout</Link></NavDropdown.Item>
                        </NavDropdown>:''}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>

    );
}
