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
def show_productAdd():
    """Show product add page"""

    bcorps = crud.return_bcorp()
    return jsonify(DATA["bcorps"])
    return render_template('add-product.html',bcorps=bcorps)

@app.route('/favorite')
def show_favorite():
    """Show favorites page"""

    return render_template('favorite.html')

@app.route('/signup', methods=["POST"])
def sign_up():
    """add new user to the DB AND GO TO HOMEPAGE"""
    data = request.get_json()

    print(data)
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']

    new_user = crud.create_user(fname,lname,email,password)

    print(new_user)

    # existing_user = crud.get_user_by_email(email)


    if email == password:
        return jsonify('success')
    #     flash('Welcome Back!')
    #     return redirect('/')
    else:
        return jsonify('yousuck')

    # if existing_user:
    #     return jsonify('An account with that email already exists')
    #     # return redirect('/signup')
    # else:
    #     crud.create_user(fname,lname,email,password)
    #     flash('Account created! Please log in.')

    return redirect('/login')


@app.route('/login', methods=["POST"])
def login_user():
    '''verify user and login'''
    data = request.get_json()

    print(data)

    email = data['email']
    password = data['password']


    # session['user'] = User.user_id

    if email == password:
        return jsonify('success')
    #     flash('Welcome Back!')
    #     return redirect('/')
    else:
        return jsonify('yousuck')
    #     flash('Your email and password do not match')


@app.route('/add-product', methods=["POST"])
def add_product():
    '''verify user and login'''

    data = request.get_json()

    print(data)

    productName = data['productName']
    company = data['company']
    productUrl = data['productUrl']
    description = data['description']

    new_product = crud.add_product(productName,company,productUrl,description)


    print(new_product)

    # session['user'] = User.user_id

    if productName == company:
        return jsonify('success')
    #     flash('Welcome Back!')
    #     return redirect('/')
    else:
        return jsonify('yousuck')

    # return redirect('/login')

if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    # connect_to_db(app)
