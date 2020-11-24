
const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {

    React.useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem('user'));
    setUser(currentuser)
    console.log(user)
  },[]);
  const [user, setUser] = React.useState()


    return (
      <Router>
        <div>
          <TopNav user={user} setUser={setUser}/>



          <Switch>
            <Route path="/login">
              <Login setUser={setUser}/>
            </Route>
            <Route path="/signup">
              <Signup setUser={setUser} user={user}/>
            </Route>
             <Route path="/add-product">
              <AddProduct />
            </Route>
            <Route path="/user-profile" setUser={setUser} user={user}>
              <ShowProfile />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/product-page/:productId">
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

