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

    return render_template('base.html')


# name this better
@app.route('/list-bcorps')
def return_bcorps():
    """return list of bcorps"""

    bcorps = crud.return_bcorp()
    print(bcorps)
    return jsonify(bcorps)

@app.route('/signup', methods=["POST"])
def sign_up():
    """add new user to the DB AND GO TO HOMEPAGE"""
    data = request.get_json()

    print(data)
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']

    existing_user = crud.get_user_by_email(email)


    if existing_user:
        return jsonify('you already exist dingus')
    #     flash('Welcome Back!')
    #     return redirect('/')
    else:
        new_user = crud.create_user(fname,lname,email,password)
        return jsonify('account created')

    return redirect('/login')


@app.route('/login', methods=["POST"])
def login_user():
    '''verify user and login'''
    data = request.get_json()

    print(data)
    email = data['email']
    password = data['password']
    user = crud.get_user_by_email(email)

    is_user = crud.validate_user(password,email)
    # session['user'] = User.user_id
    if is_user:
        return jsonify(user.fname)

    else:
        return jsonify('not logged in')



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
