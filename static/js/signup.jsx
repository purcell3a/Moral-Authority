"use strict";

  function Signup() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')

    function handleSubmit(evt){
      evt.preventDefault()
      console.log('hi')

    let data = {email:email, password:password, fname:fname, lname:lname}
    fetch('/signup',{method: "POST",  body: JSON.stringify(data),  headers: {
      'Content-Type': 'application/json'}} )
    .then(response => response.json())
    .then(data => console.log(data));
    }

    function handleEmailChange(evt){
      setEmail(evt.target.value)


    }

    function handlePasswordChange(evt){
      setPassword(evt.target.value)


    }

    function handleFnameChange(evt){
      setFname(evt.target.value)


    }

    function handleLnameChange(evt){
      setLname(evt.target.value)


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
                    Register
                  </div>
 
            <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-control-label">FIRST</label>
                            <input type="text" name="fname" className="form-control" value={fname} onChange={handleFnameChange}></input>
                        </div>
                        <div className="form-group">
                          <label className="form-control-label">LAST</label>
                          <input type="text" name="lname" className="form-control" value={lname} onChange={handleLnameChange}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">EMAIL</label>
                            <input type="text" name="email" className="form-control" value={email} onChange={handleEmailChange}></input>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">PASSWORD</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={handlePasswordChange}></input>
                        </div>

                        <div className="col-lg-12 loginbttm">
                            <div className="col-lg-6 login-btm login-text">
                            </div>
                            <div className="col-lg-6 login-btm login-button">
                                <button type="submit" className="btn btn-outline-primary">SIGNUP</button>
                            </div>
                            <div className="col-lg-6 login-btm login-button">
                                <a href="/login">Login</a>
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

ReactDOM.render(<Signup/>, document.getElementById('app'));