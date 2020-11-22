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

# import secrets

app = Flask(__name__)
app.secret_key = 'SECRETKEY'

@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('base.html')


@app.route('/recently-added')
def recently_added_products():

    recentProducts = crud.get_recently_added_products()

    return jsonify(recentProducts)

#! USER ACCOUNT ROUTES
@app.route('/signup', methods=["POST"])
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

@app.route('/login', methods=["POST"])
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

@app.route('/change-user-data',methods=['POST'])
def change_user_data():

    data = request.get_json()

    user_id = data['user_id']
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']

    updatedUser = crud.change_user_data(user_id,password=password,fname=fname,lname=lname,email=email)

    return jsonify ('Account Updated')


@app.route('/get-user-by-id',methods=["POST"])
def get_user_by_id():
    ''' gets all user profile info by id'''
    data = request.get_json()

    user_id = data['user_id']
    user = crud.get_user_by_id(user_id)
    return {'fname' : user.fname,'lname' : user.lname, 'id':user.user_id ,'email' : user.email, 'password' : user.password}

#! USER FAVORITE ROUTES
@app.route('/get-user-favorites', methods=['POST'])
def get_user_favorites():
    data = request.get_json()

    user_id = data['user_id']
    favorites = []
    # get product id for each favorite
    favorites_product_id_list = crud.get_user_favorite_product_id_list(user_id)
    # get product info for each product id 
    for product_id in favorites_product_id_list:
        product_info = crud.get_product_info(product_id)
        product= {'product_id': product_info.product_id ,
                    'title': product_info.title ,
                    'company': product_info.company ,
                    'description': product_info.description ,
                    'url': product_info.url,
                    'img_id': product_info.img_id}
        favorites.append(product)
    return jsonify(favorites)

@app.route('/add-favorite',methods=['POST'])
def add_user_favorite():
    data = request.get_json()

    user_id = data['user_id']
    product_id =data['product_id']
    #  get existing user favorites
    existing_favorites = crud.get_user_favorite_product_id_list(user_id)
    # if product_id present do not add 
    if product_id in existing_favorites:
        return jsonify('already exists')
    else:
        user_favorite =  crud.add_user_favorite(user_id,product_id)
        print(user_favorite)
        return jsonify('favorite added!!!!')

#TODO THESE CAN BE MADE INTO ONE FUNCTION IF WE ADD ANIMATION TO THE FRONT
@app.route('/remove-favorite',methods=['POST'])
def remove_user_favorite():
    data = request.get_json()

    user_id = data['user_id']
    product_id =data['product_id']
    #  get existing user favorites

    favorite_removed = crud.remove_user_favorite(user_id,product_id)

    return jsonify('removed!!!!')

#! GENERAL PRODUCT FILTERS
@app.route('/return-certs')
def return_all_certs():
    ''' return all certs'''
    certs = crud.return_certifications()

    return jsonify(certs)


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

#! PRODUCT SPECIFIC ROUTES LINE 
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
    return jsonify(product)

@app.route('/user-added-products', methods=['POST'])
def return_products_added_by_user():
    data = request.get_json()
    user_id = data['user_id']
    products = crud.get_products_added_by_user(user_id)
    return jsonify(products)

@app.route('/return-products')
def return_products():
    """return all products"""
    products = crud.get_products()

    return jsonify(products)


@app.route('/filter-products', methods=['POST'])
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
    if certifications != []:
        cert_id_list = []
        for cert in certifications:
            #*  IF CERTIFICATION IS NOT A BCORP ADD IT CERT_ID_LIST
            if cert != 'Bcorp':
                cert_id = crud.get_cert_id_by_title(cert)
                cert_id_list.append(cert_id)
            #* GET PRODUCT IDS OF PRODUCTS MADE BY BCORPS
            if cert == 'Bcorp':
                print('do this')
                #! A QUERY THAT GET'S COMPANIES IN CERT TABLE AND PRODUCT TABLE 
                # bcorps = crud.get_bcorps()
                # for company in bcorps:
                #     product_id = crud.get_product_made_by_bcorp(company)
                #     if product_id != 'no product':
                #         product_ids.append(product_id)
        #*  GET PRODUCTS ID'S WITH CERT IDS
        #? I FEEL  LIKE A LOT OF THIS COULD BE DONE BETTER IN CRUD?
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
            productObj= {'product_id': product.product_id,
                        'title': product.title,
                        'company': product.company,
                        'description': product.description,
                        'url': product.url,
                        'img_id': 1}
            products.append(productObj)
    return jsonify(products)

@app.route('/add-product', methods=["POST"])
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
    file_from_data = data['file']
    selectedCerts = data['selectedCerts']
    # TODO img = data['img']
     # ****************************** #

    # GET DEPARTMENT/CATEGORY ID FROM DB BASED ON DATA
    category_id = crud.get_category_id(category_from_data)


    #  GET ALL CERT IDS FOR CERTS GIVEN IF THEY AREN'T A BCORP
    cert_id_list = []
    for cert in selectedCerts:
        if cert != 'Bcorp':
            cert_id = crud.get_cert_id_by_title(cert)
            cert_id_list.append(cert_id)
    print('*********************************************************')
    print('cert ID LIST =', cert_id_list)

    # TODO PROCESS IMAGE WITH CLOUDINARY
    # img = cloudinary.config(file_from_data)
    # cloudinary.uploader.upload("s3://my-bucket/my-path/example.jpg") FOR FILE UPLOADS
    # cloudinary.uploader.upload("https://www.example.com/sample.jpg") FOR URLS
    # print('THIS IS FILE FROM DATA **************************************************************')
    # print(img)

    #  IF THERE IS A BCORP IGNORE THE COMPANY PROVIDED (we can do this on the front end later maybe?)
    if bcorp:
        company = bcorp
        new_product = crud.add_product(productName,productUrl,company,description,category_id,user_id)
        product_id = crud.get_product_id(productName,user_id)
        #  ADD PRODUCT CERTIFICATIONS TO RELATIONAL TABLE (which we don't need to do for bcorps)
        for cert_id in cert_id_list:
            new_certification = crud.add_product_certifications(product_id,cert_id)
        return jsonify('Product added')
    #  IF THERE IS NO BCORP
    else:
        # MAKE THE PRODUCT AND GET THE PRODUCT ID FROM DB
        new_product = crud.add_product(productName,company,productUrl,description,category_id,user_id)
        product_id = crud.get_product_id(productName,user_id)
        print('new_product',new_product)
        #  ADD PRODUCT CERTIFICATIONS TO RELATIONAL TABLE (which we don't need to do for bcorps)
        for cert_id in cert_id_list:
            new_certification = crud.add_product_certifications(product_id,cert_id)
        return jsonify('Product added')


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
    # connect_to_db(app)
