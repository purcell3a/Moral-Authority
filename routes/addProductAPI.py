from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets


addProductAPI = Blueprint('addProductAPI',__name__)

@addProductAPI.route('/api/return-certs')  #!this is also used in shop.jsx ....how do we want to handle routes that apply to more than one file?
def return_all_certs():
    ''' return all certs'''
    certs = crud.return_certifications()

    return jsonify(certs)



@addProductAPI.route('/api/list-subCategories', methods=["POST"])
def get_subcategory():

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    department = (data['department'])
    # ****************************** #
    subcategories = crud.get_subcategory(department)

    return jsonify(subcategories)


@addProductAPI.route('/api/list-departments-subcategories')
def get_departments_subcateogries():
    ''' return list of departments/categories'''
    departments_categories = crud.get_departments_subcateogries()
    return jsonify(departments_categories)


@addProductAPI.route('/api/list-bcorps')
def return_bcorps():
    """return list of bcorps"""

    bcorps = crud.return_bcorp()
    return jsonify(bcorps)


@addProductAPI.route('/api/add-product', methods=["POST"])
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
    selectedSubCategory = data['selectedSubCategory'] #! IP
    category_from_data = data['category']
    selectedCerts = data['selectedCerts']
    img_url = data['img']
     # ****************************** #

    # GET DEPARTMENT/CATEGORY ID FROM DB BASED ON DATA
    category_id = crud.get_category_id(category_from_data)

    # GET SUBCATEGORY ID FROM DB BASED ON DATA
    subcategory_id = crud.get_subcategory_id(selectedSubCategory) #! IP

    #  GET ALL CERT IDS FOR CERTS GIVEN IF THEY AREN'T A BCORP
    cert_id_list = []
    for cert in selectedCerts:
        if cert != 'Bcorp':
            cert_id = crud.get_cert_id_by_title(cert)
            cert_id_list.append(cert_id)

    #  IF THERE IS A BCORP IGNORE THE COMPANY PROVIDED (we can do this on the front end later maybe?)
    if bcorp:
        company = bcorp
    new_product = crud.post_product(productName,productUrl,company,description,category_id,subcategory_id,user_id)
    product_id = crud.get_product_id(productName,user_id)
    if img_url:
        image_id = crud.post_image(img_url,product_id)
        product = crud.put_product_image(image_id,product_id)
    print('new_product',product)
    #  ADD PRODUCT CERTIFICATIONS TO RELATIONAL TABLE (which we don't need to do for bcorps)
    for cert_id in cert_id_list:
        new_certification = crud.post_product_certifications(product_id,cert_id)
    return jsonify('Product added')