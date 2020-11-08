function App() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Add-Product">Add-Product</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/Add-Product" component={AddProduct}>
              <AddProduct />
            </Route>
            <Route path="/login" component={Login}>
              <Login />
            </Route>
            <Route path="/" component={Homepage}>
              <Homepage />
            </Route>
            <Route path="/signup" component={Signup}>
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
