
const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {

  function getCurrentUser(){
    const currentuser = localStorage.getItem('user');
    return currentuser
  }


  const [user, setUser] = React.useState(getCurrentUser)
  console.log(user)


    return (
      <Router>
        <div>
          <TopNav user={user} setUser={setUser}/>



          <Switch>
            <Route path="/login">
              <Login setUser={setUser}/>
            </Route>
            <Route path="/logout">
              <Logout />
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
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/product-page">
              <ProductPage />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));

