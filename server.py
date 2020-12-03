from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets


#! PRODUCT SPECIFIC ROUTES LINE 177
#! USER ACCOUNT ROUTES LINE 41
#! USER FAVORITE ROUTES LINE 104
#! GENERAL PRODUCT FILTERS LINE 154


cloudinary.config(
  cloud_name = "ClOUDNAME",
  api_key = "APIKEY",
  api_secret = "SECRETAPIKEY"
)

app = Flask(__name__)
app.secret_key = 'SECRETKEY'


@app.route('/', defaults={'input_path': ''}) #if this matches the URL
@app.route('/<path:input_path>') #or if this does
def show_homepage(input_path):
    """Show the application's homepage."""
    return render_template('base.html')


@app.route('/api/recently-added')
def recently_added_products():
    recentProducts = crud.get_recently_added_products()

    return jsonify(recentProducts)

#! USER ACCOUNT ROUTES
@app.route('/api/signup', methods=["POST"])
def sign_up():
    """add new user to the DB AND GO TO HOMEPAGE"""
    data = request.get_json()

    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']

    existing_user = crud.does_user_exist(email)
    if existing_user == 'user exists':
        return jsonify('you already exist dingus')
    else:
        new_user = crud.create_user(fname,lname,email,password)
        return jsonify('account created')


@app.route('/api/login', methods=["POST"])
def login_user():
    '''verify user and login'''
    data = request.get_json()

    email = data['email']
    password = data['password']
    user = crud.get_user_by_email(email)

    is_user = crud.validate_user(password,email)

    if is_user:
        return jsonify({'fname' : user['fname'], 'id':user['user_id'] })

    else:
        return jsonify('info does not match')



@app.route('/api/change-user-data',methods=['POST'])
def change_user_data():

    data = request.get_json()

    user_id = data['user_id']
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']
    profilePhoto = data['profilePhoto']
    updatedUser = crud.change_user_data(user_id,password=password,fname=fname,lname=lname,email=email,profilePhoto=profilePhoto)
    updated_user_info = {'fname': updatedUser.fname,
                'id': updatedUser.user_id}
    print('****************************************************************************')
    print('updateUser=',user_id,password,fname,lname,email)

    return jsonify ({'status':'Account Updated', 'user': updated_user_info})


@app.route('/api/get-user-by-id',methods=["POST"])
def get_user_by_id():
    ''' gets all user profile info by id'''
    data = request.get_json()

    user_id = data['user_id']
    user = crud.get_user_by_id(user_id)
    return {'fname' : user.fname,'lname' : user.lname, 'id':user.user_id ,'email' : user.email, 'password' : user.password, 'profile_img':user.profile_img}

#! USER FAVORITE ROUTES
@app.route('/api/get-user-favorites', methods=['POST'])
def get_user_favorites():
    data = request.get_json()
    user_id = int(data['user_id'])
    #* GET USER FAVORITES
    favorite_product_list = crud.get_user_favorites(user_id)
    return jsonify(favorite_product_list)

@app.route('/api/toggle-favorite',methods=['POST'])
def add_user_favorite():

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = int(data['user_id'])
    product_id= int(data['product_id'])
    # ****************************** #

    # CHECK IF FAVORITE EXITS
    favorite = crud.get_user_favorite(user_id, product_id)
    print('**************************************************************************************')
    print('FAVORITE',favorite)
    print('**************************************************************************************')

    # IF FAVORITE THEN REMOVE
    if favorite:
        print('**************************************************************************************')
        print('REMOVING FAVORITE')
        favorite_removed = crud.remove_user_favorite(user_id,product_id)
        return jsonify('Favorite Removed')
    else:
        print('**************************************************************************************')
        print('ADDED FAVORITE')
        user_favorite = crud.add_user_favorite(user_id,product_id)
        print(user_favorite)
        return jsonify('Favorite Added!!!!')

#! GENERAL PRODUCT FILTERS
@app.route('/api/return-certs')
def return_all_certs():
    ''' return all certs'''
    certs = crud.return_certifications()

    return jsonify(certs)


@app.route('/api/list-bcorps')
def return_bcorps():
    """return list of bcorps"""

    bcorps = crud.return_bcorp()
    return jsonify(bcorps)


@app.route('/api/list-departments')
def return_list_departments():
    ''' return list of departments/categories'''
    departments= crud.return_departments()
    return jsonify(departments)


#! PRODUCT SPECIFIC ROUTES LINE 
@app.route('/api/product-info',methods=['POST'])
def return_product_info():
    """Returns product info for Product page"""
    data = request.get_json()
    productId = data['productId']
    product_info = crud.get_product_info(productId)
    return jsonify(product_info)

@app.route('/api/user-added-products', methods=['POST'])
def return_products_added_by_user():
    data = request.get_json()
    user_id = data['user_id']
    products = crud.get_products_added_by_user(user_id)
    return jsonify(products)

@app.route('/api/return-products', methods=['POST'])
def return_products():
    """return all products"""
    data = request.get_json()
    user_id = int(data['user_id'])

    result = crud.get_products(user_id)
    return jsonify(result)


@app.route('/api/filter-products', methods=['POST'])
def filter_products():
    '''filter products and return to shop page'''
    product_ids = []
    products = []

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    department = data['selectedDepartment']
    certifications = (data['selectedCerts'])
    # ****************************** #

    #*  IF THERE ARE CERTIFICATIONS GET CERT IDS
    if certifications:
        cert_id_list = []
        for cert in certifications:
            #*  IF CERTIFICATION IS NOT A BCORP ADD IT CERT_ID_LIST
            if cert != 'Bcorp':
                cert_id = crud.get_cert_id_by_title(cert)
                cert_id_list.append(cert_id)
            #* GET PRODUCT IDS OF PRODUCTS MADE BY BCORPS
            if cert == 'Bcorp':
                bcorps_product_ids = crud.get_product_ids_made_by_bcorps()
                for product_id in bcorps_product_ids:
                        product_ids.append(product_id)
        #*  GET PRODUCTS ID'S WITH CERT IDS
        for cert_id in cert_id_list:
            product_id_list_from_certs = crud.get_product_id_by_cert_id(cert_id)
            #* IF THERE ARE CERTIFICATIONS AND DEPARTMENTS
            if department:
                category_id = crud.get_category_id(department)
                # * GET PRODUCT IDS WITH category_id AND product_id FROM CERTS
                for product_id in product_id_list_from_certs:
                    product_ids = crud.filter_by_department_and_certification(category_id,product_id)
            else:
                product_ids = product_id_list_from_certs
    else:
        if department != '':
            category_id = crud.get_category_id(department)
            product_ids = crud.filter_by_department(category_id)
    #* NOW LOOP THROUGH PRODUCT IDS AND RETURN PRODUCT OBJECTS 
    for productId in product_ids:
            product = crud.get_product_info(productId)
            products.append(product)
    return jsonify(products)

@app.route('/api/add-product', methods=["POST"])
def add_product():
    '''adds new product to db'''

    # GET BASIC INFO FROM DATA
    data = request.get_json()

    user_id = data['user_id']
    bcorp = data['selectedBCorp']
    productName = data['productName']
    company = data['company']
    productUrl = data['productUrl']
    description = data['description']
    # ****************************** #

    #  INFO THAT NEEDS MORE PROCESSING
    category_from_data = data['category']
    selectedCerts = data['selectedCerts']
    img_url = data['img']
     # ****************************** #

    # GET DEPARTMENT/CATEGORY ID FROM DB BASED ON DATA
    category_id = crud.get_category_id(category_from_data)


    #  GET ALL CERT IDS FOR CERTS GIVEN IF THEY AREN'T A BCORP
    cert_id_list = []
    for cert in selectedCerts:
        if cert != 'Bcorp':
            cert_id = crud.get_cert_id_by_title(cert)
            cert_id_list.append(cert_id)

    #  IF THERE IS A BCORP IGNORE THE COMPANY PROVIDED (we can do this on the front end later maybe?)
    if bcorp:
        company = bcorp
    new_product = crud.add_product(productName,productUrl,company,description,category_id,user_id)
    product_id = crud.get_product_id(productName,user_id)
    if img_url:
        image_id = crud.add_image(img_url,product_id)
        product = crud.update_product_image(image_id,product_id)
    print('new_product',product)
    #  ADD PRODUCT CERTIFICATIONS TO RELATIONAL TABLE (which we don't need to do for bcorps)
    for cert_id in cert_id_list:
        new_certification = crud.add_product_certifications(product_id,cert_id)
    return jsonify('Product added')


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    # connect_to_db(app)
