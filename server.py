from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify)
# from model import connect_to_db, db
# import crud
from jinja2 import StrictUndefined
# import secrets

app = Flask(__name__)
# app.secret_key = 'SECRETKEY'
# app.jinja_env.undefined = StrictUndefined

@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('homepage.html')


@app.route('/login')
def show_login():
    """Show login page"""

    return render_template('login.html')

@app.route('/signup')
def show_signup():
    """Show signup page"""

    return render_template('signup.html')

@app.route('/product')
def show_product():
    """Show product page"""

    return render_template('product.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
