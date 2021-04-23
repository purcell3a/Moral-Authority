from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
import cloudinary


shopAPI = Blueprint('shopAPI',__name__)


@shopAPI.route('/api/toggle-favorite',methods=['POST'])
def post_user_favorite():

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = int(data['user_id'])
    product_id= int(data['product_id'])
    # ****************************** #

    # CHECK IF FAVORITE EXITS
    favorite = crud.get_user_favorite(user_id, product_id)

    # IF FAVORITE THEN REMOVE
    if favorite:
        favorite_removed = crud.delete_user_favorite(user_id,product_id)
        return jsonify('Favorite Removed')
    else:
        user_favorite = crud.post_user_favorite(user_id,product_id)
        print(user_favorite)
        return jsonify('Favorite Added!!!!')



@shopAPI.route('/api/return-products', methods=['POST'])
def return_products():
    """return all products"""
    print('**********************************************************************')

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = int(data['user_id'])
    # department = data['dep']
    subcategory = data['cat']
    # ****************************** #
    # print(department)
    print(subcategory)

    result = crud.get_products_by_subcategory(subcategory,user_id)
    # result = crud.get_products_by_department(department,user_id)
    return jsonify(result)


@shopAPI.route('/api/return-certs')
def return_all_certs():
    ''' return all certs'''
    certs = crud.return_certifications()

    return jsonify(certs)



@shopAPI.route('/api/return-search-parameters', methods=['POST'])
def return_search_parameters():
    """return search parameters"""
    print('**********************************************************************')

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = int(data['user_id'])
    subcategory = data['cat']
    # ****************************** #
    result = crud.get_search_parameters_by_subcategory(subcategory,user_id)

    return jsonify(result)


# ! STILL NOT FILTERING FOR PRODUCT TYPE OR COMPANY YET
@shopAPI.route('/api/filter-products', methods=['POST'])
def filter_products():
    '''filter products and return to shop page'''
    product_ids = []
    products = []

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    department = data['dep']
    certifications = (data['selectedCerts'])
    companies = (data['selectedCompanies'])
    types = (data['typesForFilter'])
    category_id = crud.get_category_id(department)
    # ****************************** #

    #*  IF THERE ARE CERTIFICATIONS GET CERT IDS
    if certifications:
        cert_id_list = []
        for cert in certifications:

            #*  IF CERTIFICATION IS NOT A BCORP ADD IN CERT_ID_LIST
            if cert != 'Bcorp':
                cert_id = crud.get_cert_id_by_title(cert)
                cert_id_list.append(cert_id)

            #* GET PRODUCT IDS OF PRODUCTS MADE BY BCORPS IN DEPARTMENT
            if cert == 'Bcorp':
                bcorps_product_ids = crud.get_product_ids_made_by_bcorps_in_department(category_id)
                for product_id in bcorps_product_ids:
                        product_ids.append(product_id)

        #*  GET PRODUCTS ID'S WITH CERT IDS
        for cert_id in cert_id_list:
            product_id_list_from_certs_and_categories = crud.get_product_id_by_cert_and_category_id(cert_id,category_id)

    #* NOW LOOP THROUGH PRODUCT IDS AND RETURN PRODUCT OBJECTS
    for productId in product_ids:
            product = crud.get_product_info(productId)
            products.append(product)
    return jsonify(products)