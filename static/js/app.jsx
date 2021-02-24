
const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {
    const [user, setUser] = React.useState(undefined)

    React.useEffect(() => {
      const currentuser = JSON.parse(localStorage.getItem('user'));
      setUser(currentuser)
    },[]);

    // TODO READ ABOUT REDUX

    return (
      <Router>

          <TopNav user={user} setUser={setUser}/>
          <DepartmentNav/>

          <Switch>
                  <Route path="/about">
                      <About/>
                  </Route>


                  <Route path='/login'>
                      <Login user={user} setUser={setUser}/>
                  </Route>


                  <Route path='/signup'>
                      <Signup setUser={setUser} user={user}/>
                  </Route>


                  <Route path='/add-product'>
                      <AddProduct user={user} />
                  </Route>


                  <Route path='/user-profile'>
                      <ShowProfile setUser={setUser} user={user}/>
                  </Route>


                  {/* <Route exact path='/shop/:dep' exact component={Shop} user={user}>
                  </Route> */}

                  <Route path='/product-page/:productId'>
                      <ProductPage user={user} />
                  </Route>

                  <Route path='/shop/:cat' exact component={Shop} user={user}>
                  </Route>

                  <Route path="/">
                      <Homepage user={user} />
                  </Route>

          </Switch>

          <Footer/>

      </Router>

    );
}

ReactDOM.render(<App />, document.getElementById('app'));

