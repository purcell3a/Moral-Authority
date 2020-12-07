
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

          <Switch>
                  <Route path="/about">
                      <About/>
                      <Footer/>
                  </Route>


                  <Route path='/login'>
                      <Login user={user} setUser={setUser}/>
                      <Footer/>
                  </Route>


                  <Route path='/signup'>
                      <Signup setUser={setUser} user={user}/>
                      <Footer/>
                  </Route>


                  <Route path='/add-product'>
                      <AddProduct user={user} />
                      <Footer/>
                  </Route>


                  <Route path='/user-profile'>
                      <ShowProfile setUser={setUser} user={user}/>
                      <Footer/>
                  </Route>


                  <Route path='/shop'>
                      <Shop user={user} />
                      <Footer/>
                  </Route>


                  <Route path='/product-page/:productId'>
                      <ProductPage user={user} />
                      <Footer/>
                  </Route>


                  <Route path="/">
                      <Homepage user={user} />
                      <Footer/>
                  </Route>

          </Switch>

      </Router>

    );
}

ReactDOM.render(<App />, document.getElementById('app'));

