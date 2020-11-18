from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
# import secrets

app = Flask(__name__)
app.secret_key = 'SECRETKEY'

@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('base.html')

@app.route('/product-info',methods=['POST'])
def return_product_info():
    """Returns product info for Product page"""
    data = request.get_json()
    productId = data['productId']
    product_info = crud.get_product_info(productId)
    product= {'product_id': product_info.product_id ,
                    'title': product_info.title ,
                    'company': product_info.company ,
                    'description': product_info.description ,
                    'url': product_info.url,
                    'img_id': product_info.img_id}
    print('*****************************************************************')
    print('product_info=',product)
    print('*****************************************************************')
    return jsonify(product)

@app.route('/return-products')
def return_products():
    """return all products"""
    products = crud.get_products()

    return jsonify(products)


@app.route('/list-bcorps')
def return_bcorps():
    """return list of bcorps"""

    bcorps = crud.return_bcorp()
    return jsonify(bcorps)

@app.route('/list-departments')
def return_list_departments():
    ''' return list of departments/categories'''
    departments= crud.return_departments()
    return jsonify(departments)


@app.route('/change-user-data',methods=['POST'])
def change_user_data():

    data = request.get_json()

    user_id = data['user_id']
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']

    updatedUser = crud.change_user_data(fname,lname,email,password,user_id)

    return jsonify ('Account Updated')

@app.route('/get-user-by-id',methods=["POST"])
def get_user_by_id():
    ''' gets all user profile info by id'''
    data = request.get_json()

    user_id = data['user_id']
    user = crud.get_user_by_id(user_id)
    return {'fname' : user.fname,'lname' : user.lname, 'id':user.user_id ,'email' : user.email, 'password' : user.password}


@app.route('/signup', methods=["POST"])
def sign_up():
    """add new user to the DB AND GO TO HOMEPAGE"""
    data = request.get_json()

    print(data)
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']
    print('email')
    print(email)
    existing_user = crud.does_user_exist(email)
    print('*****************************************************************')
    print(existing_user)

    if existing_user == 'user exists':
        return jsonify('you already exist dingus')
    else:
        new_user = crud.create_user(fname,lname,email,password)
        return jsonify('account created')



@app.route('/login', methods=["POST"])
def login_user():
    '''verify user and login'''
    data = request.get_json()

    print(data)
    email = data['email']
    password = data['password']
    user = crud.get_user_by_email(email)
    print('*****************************************************************')
    print('user=',user)
    print('*****************************************************************')
    is_user = crud.validate_user(password,email)
    # session['user'] = User.user_id

    if is_user:
        return jsonify({'fname' : user['fname'], 'id':user['user_id'] })

    else:
        return jsonify('info does not match')



@app.route('/add-product', methods=["POST"])
def add_product():
    '''adds new product to db'''

    data = request.get_json()

    # user = data['user']
    category_from_data = data['category']
    category_id = crud.get_category_id(category_from_data)
    bcorp = data['selectedBCorp']
    productName = data['productName']
    company = data['company']
    productUrl = data['productUrl']
    description = data['description']
    category_from_data = data['category']
    print('CATEGORY FROM DATA', category_from_data)
    print('productname FROM DATA', productName)
    # need a way to pull the user_id from local storage and pass it in with product submit
    if bcorp:
        company = bcorp
        new_product = crud.add_product(productName,company,productUrl,description,category_id)
        return jsonify('product made')
    else:
        return jsonify('try again')


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    # connect_to_db(app)
