
const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

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
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/add-product">AddProduct</Link>
              </li>
              <li>
                <Link to="/user-profile">UserProfile</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          {/* <Route path="/">
              <Homepage />
            </Route> */}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/add-product">
              <AddProduct />
            </Route>
            <Route path="/user-profile">
              <ShowProfile />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

// function Homepage() {
//   return (
//     <React.Fragment>
//       <div> this is my homepage</div>
//     </React.Fragment>
//   );
// }

ReactDOM.render(<App />, document.getElementById('app'));

