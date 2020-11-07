from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
# import secrets

app = Flask(__name__)
app.secret_key = 'SECRETKEY'
# app.jinja_env.undefined = StrictUndefined

@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('homepage.html')


@app.route('/login')
def show_login():
    """Show login page"""

    return render_template('login.html')

@app.route('/signup', methods= ["GET"])
def show_signup():
    """Show signup page"""

    return render_template('signup.html')

@app.route('/product')
def show_product():
    """Show product page"""

    return render_template('product.html')

@app.route('/add-product')
def add_product():
    """Show product page"""

    return render_template('add-product.html')

@app.route('/favorite')
def show_favorite():
    """Show favorites page"""

    return render_template('favorite.html')

@app.route('/signup', methods=["POST"])
def sign_up():
    """add new user to the DB AND GO TO HOMEPAGE"""

    fname = request.form.get('fname')
    lname = request.form.get('lname')
    email = request.form.get('email')
    password = request.form.get('password')

    existing_user = crud.get_user_by_email(email)

    if existing_user:
        flash('An account with that email already exists')
        return redirect('/signup')
    else:
        crud.create_user(fname,lname,email,password)
        flash('Account created! Please log in.')

    return redirect('/login')


@app.route('/login', methods=["POST"])
def login_user():
    '''verify user and login'''
    data = request.get_json()
    
    print(data)

    email = data['email']
    password = data['password']



    # email = request.form.get('login-email')
    # password = request.form.get('login-password')
    # user = crud.get_user_by_email(email)
    # user_passw = crud.validate_user_password(password)

    # session['user'] = User.user_id

    if email == password:
        return jsonify('success')
    #     flash('Welcome Back!')
    #     return redirect('/')
    else:
        return jsonify('yousuck')
    #     flash('Your email and password do not match')

    # return redirect('/login')

# @app.route('/add-product', methods=["POST"])
# def add_product():
    # '''verify user and login'''

    # print('connected')

    # email = request.form.get('login-email')
    # password = request.form.get('login-password')

    # print(email)
    # print(password)


    # user_email = crud.get_user_by_email(email)
    # user_password = crud.validate_user_password(password)

    # # session['user'] = User.user_id

    # if user_email == user_password and user_email:
    #     flash('Welcome Back!')
    #     return redirect('/')
    # else:
    #     flash('Your email and password do not match')

    # return redirect('/login')

if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    # connect_to_db(app)
