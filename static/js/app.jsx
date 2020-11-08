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
            <Route path="/Add-Product">
              <AddProduct />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
            <Route path="/signup">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

  ReactDOM.render(<App />, document.getElementById('app'));
