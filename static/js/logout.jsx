"use strict";

function Logout() {

  const history = useHistory()


  function handleSubmit(evt){
    evt.preventDefault()
    localStorage.removeItem('user');
    console.log('logged out')
    history.push('/');
  }

    return (

      <React.Fragment>
            <Button onClick={handleSubmit} variant="light">Logout</Button> 
      </React.Fragment>
    );
  }
