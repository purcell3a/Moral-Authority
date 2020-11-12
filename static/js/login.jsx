"use strict";

// const { checkPropTypes } = require("prop-types");



//   onSubmit = () => {
//      if(userFound){
//          return  <Redirect  to="/posts/" />
//      }
//   }


function Login() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')


  function handleSubmit(evt){
    evt.preventDefault()
    console.log('hi')

  let data = {email:email, password:password}
  fetch('/login',{method: "POST",  body: JSON.stringify(data),  headers: {
    'Content-Type': 'application/json'}} )
  .then(response => response.json())
  .then(data => console.log(data));


  // React.useEffect(() => {
  //   fetch('/login')
  //     .then(response => response.json())
  //     .then(data => setUser(data));
  //     history.pushState('/');
  //     //  props allows us to set a "true" attribute on User
  //     props.setUser(true);
  //     localStorage.setItem('user',(data));
  // }, []);

  }


  function handleEmailChange(evt){
    setEmail(evt.target.value)


  }

  function handlePasswordChange(evt){
    setPassword(evt.target.value)


  }

    return (

      <React.Fragment>


          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                  <div className="col-lg-12 login-key">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </div>
                  <div className="col-lg-12 login-title">
                    Login
                  </div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-control-label">EMAIL</label>
                        <input type="text" name="login-email" className="form-control" value={email} onChange={handleEmailChange}></input>
                      </div>
                      <div className="form-group">
                        <label className="form-control-label">PASSWORD</label>
                        <input type="text" name="login-password" className="form-control" value={password} onChange={handlePasswordChange}></input>
                      </div>

                      <div className="col-lg-12 loginbttm">
                      <div className="col-lg-6 login-btm login-text">

                      </div>
                      <div className="col-lg-6 login-btm login-button">
                        <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                      </div>
                      <div className="col-lg-6 login-btm login-button">
                          <a href="/signup">Register</a>
                      </div>
                      </div>
                      </form>
                      </div>
            </div>
            <div className="col-lg-3 col-md-2"></div>
        </div>
    </div>
    </div>
      </React.Fragment>
    );
  }

