
const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {
  const [user, setUser] = React.useState(null)

    return (
      <Router>
        <div>
          <TopNav user={user}/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              {/* <Login/> */}
              <Login setUser={setUser}/>
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
            <Route path="/all-product">
              <AllProducts />
            </Route>
            <Route path="/product">
              <ShowProduct />
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

