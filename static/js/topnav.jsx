"use strict";

function TopNav(props){
    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Moral Authority</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            {props.user?'':<Nav.Link><Link to="/signup">Login | Signup</Link></Nav.Link>}
            <Nav.Link><Link to="/shop"> Shop</Link></Nav.Link>
            {props.user?
            <NavDropdown title= {props.user.fname} id="basic-nav-dropdown">
                    <NavDropdown.Item><Link to="/user-profile">Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/add-product">AddProduct</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item><Link to="/logout">Logout</Link></NavDropdown.Item>
            </NavDropdown>:''}

        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
        </Form>
        </Navbar.Collapse>
        </Navbar>

    );
}
