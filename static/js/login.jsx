"use strict";

// const { checkPropTypes } = require("prop-types");



//   onSubmit = () => {
//      if(userFound){
//          return  <Redirect  to="/posts/" />
//      }
//   }


function Login(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const history = useHistory()


  function handleSubmit(evt){
    evt.preventDefault()
    let data = {email:email, password:password}
    fetch('/login' ,{method: "POST",  body: JSON.stringify(data),  headers: {
      'Content-Type': 'application/json'}})
      .then(response => response.json())
      // data is the user we are pulling from our db after verifying their info above
      .then(data => {
        if (data !== 'not logged in'){
          props.setUser(data)
          localStorage.setItem('user',(data));
          history.push('/');
        }else{
          alert('Ivalid Username or Password')
        }
    console.log('hi')
      });

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

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input type="text" name="login-email" placeholder="Email" className="form-control" value={email} onChange={handleEmailChange}></input>
                      </div>
                      <div className="form-group">
                        <input type="text" name="login-password" placeholder="Password" className="form-control" value={password} onChange={handlePasswordChange}></input>
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

