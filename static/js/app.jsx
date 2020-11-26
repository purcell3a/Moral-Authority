
const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {
    const [user, setUser] = React.useState()
    React.useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem('user'));
    setUser(currentuser)
    console.log(user)
  },[]);



    return (
      <Router>
        <div>
          <TopNav user={user} setUser={setUser}/>



          <Switch>
            <Route path='/app/login'>
              <Login setUser={setUser}/>
            </Route>
            <Route path='/app/signup'>
              <Signup setUser={setUser} user={user}/>
            </Route>
             <Route path='/app/add-product'>
              <AddProduct />
            </Route>
            <Route path='/app/user-profile'>
              <ShowProfile setUser={setUser} user={user}/>
            </Route>
            <Route path='/app/shop'>
              <Shop />
            </Route>
            <Route path='/app/product-page/:productId'>
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

