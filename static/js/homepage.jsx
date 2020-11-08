// "use strict";

// *******************************************************************
function Homepage() {
    return (
      <React.Fragment>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Register</a></li>
          <li><a href="/add-product">Add Product</a></li>
        </ul>
      </React.Fragment>
    );
  }

  ReactDOM.render(<Homepage />, document.getElementById('app'));
// ******************************************************************* */
