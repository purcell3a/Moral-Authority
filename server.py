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
from routes.loginAPI import loginAPI
from routes.signupAPI import signupAPI


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
app.register_blueprint(loginAPI)
app.register_blueprint(signupAPI)
app.secret_key = 'SECRETKEY'

@app.route('/', defaults={'input_path': ''}) #if this matches the URL
@app.route('/<path:input_path>') #or if this does
def show_homepage(input_path):
    """Show the application's homepage."""
    return render_template('base.html')



# ? KEEPING NOTE OF ROUTES IN MULTIPLE FILES JUST FOR NOW


#? ROUTES IN USER PROFILE & SHOP API ===================
# @app.route('/api/toggle-favorite',methods=['POST'])

#? ROUTES IN ADD PRODUCT & DEPARTMENT NAV API ==========
# @app.route('/api/list-departments-subcategories')


@app.route('/api/list-departments')
def return_list_departments():
    ''' return list of departments/categories'''
    departments= crud.return_departments()
    return jsonify(departments)




if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    # connect_to_db(app)
