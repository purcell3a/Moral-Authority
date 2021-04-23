from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify, Blueprint,blueprints)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets

from routes.addProductAPI import addProductAPI
from routes.shopAPI import shopAPI
from routes.departmentNavAPI import departmentNavAPI
from routes.homepageAPI import homepageAPI
from routes.productPageAPI import productPageAPI
from routes.userProfileAPI import userProfileAPI


cloudinary.config(
  cloud_name = "ClOUDNAME",
  api_key = "APIKEY",
  api_secret = "SECRETAPIKEY"
)

app = Flask(__name__)
app.register_blueprint(addProductAPI)
app.register_blueprint(shopAPI)

app.register_blueprint(departmentNavAPI)
app.register_blueprint(homepageAPI)

app.register_blueprint(productPageAPI)
app.register_blueprint(userProfileAPI)

app.secret_key = 'SECRETKEY'




@app.route('/', defaults={'input_path': ''}) #if this matches the URL
@app.route('/<path:input_path>') #or if this does
def show_homepage(input_path):
    """Show the application's homepage."""
    return render_template('base.html')


#  <================================ IN PROGRESS ==================================>


# @app.route('/api/list-subCategories', methods=["POST"])
# def get_subcategory():

#     #  GET DATA
#     # ****************************** #
#     data = request.get_json()
#     department = (data['department'])
#     # ****************************** #
#     subcategories = crud.get_subcategory(department)

#     return jsonify(subcategories)


# @app.route('/api/recently-added', methods=["POST"])
# def recently_added_products():

#     #  GET DATA
#     # ****************************** #
#     data = request.get_json()
#     user_id = int(data['user_id'])
#     # ****************************** #

#     recentProducts = crud.get_recently_added_products(user_id)

#     return jsonify(recentProducts)



@app.route('/api/signup', methods=["POST"])
def sign_up():
    """add new user to the DB AND GO TO HOMEPAGE"""

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']
    # ****************************** #

    existing_user = crud.does_user_exist(email)
    if existing_user == 'user exists':
        return jsonify('you already exist dingus')
    else:
        new_user = crud.post_user(fname,lname,email,password)
        return jsonify('account created')


@app.route('/api/login', methods=["POST"])
def login_user():
    '''verify user and login'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()

    email = data['email']
    password = data['password']
    user = crud.get_user_by_email(email)
    # ****************************** #

    is_user = crud.validate_user(password,email)

    if is_user:
        return jsonify({'fname' : user['fname'], 'id':user['user_id'] })

    else:
        return jsonify('info does not match')



# @app.route('/api/get-user-by-id',methods=["POST"]) #? IN USERPROFILEAPI

# @app.route('/api/get-user-favorites', methods=['POST']) #? THIS IS IN USERPROFILEAPI

# @app.route('/api/toggle-favorite',methods=['POST']) #? THIS IS IN SHOPAPI AND USER PROFILE API



# @app.route('/api/list-bcorps')



# @app.route('/api/list-departments-subcategories') #? THIS IS USED IN DEPARTMENTNAV AND ADDPRODUCT


@app.route('/api/list-departments')
def return_list_departments():
    ''' return list of departments/categories'''
    departments= crud.return_departments()
    return jsonify(departments)

# @app.route('/api/product-info',methods=['POST'])  #? USED IN PRODUCTPAGEAPI

# @app.route('/api/user-added-products', methods=['POST']) #? USED IN USERPROFILEAPI

# @app.route('/api/filter-products', methods=['POST']) # ? THIS IS IN SHOPAPI



if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    # connect_to_db(app)
