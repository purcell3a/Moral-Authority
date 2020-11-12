"use strict";

function TopNav(){
    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link><Link to="/login">Login</Link></Nav.Link>
            <Nav.Link><Link to="/signup">Signup</Link></Nav.Link>
            <Nav.Link><Link to="/product-page">Product Page</Link></Nav.Link>
            <Nav.Link><Link to="/product">Products</Link></Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item><Link to="/add-product">AddProduct</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/user-profile">UserProfile</Link></NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
        </Form>
        </Navbar.Collapse>
        </Navbar>

    );
}
