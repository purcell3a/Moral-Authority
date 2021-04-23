from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets


userProfileAPI = Blueprint('userProfileAPI',__name__)

@userProfileAPI.route('/api/user-added-products', methods=['POST'])
def return_products_added_by_user():
    data = request.get_json()
    user_id = data['user_id']
    products = crud.get_products_added_by_user(user_id)
    return jsonify(products)


@userProfileAPI.route('/api/get-user-by-id',methods=["POST"])
def get_user_by_id():
    ''' gets all user profile info by id'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()

    user_id = data['user_id']
    user = crud.get_user_by_id(user_id)
    # ****************************** #

    return {'fname' : user.fname,'lname' : user.lname, 'id':user.user_id ,'email' : user.email, 'password' : user.password, 'profile_img':user.profile_img}


@userProfileAPI.route('/api/get-user-favorites', methods=['POST'])
def get_user_favorites():

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = int(data['user_id'])
    # ****************************** #

    favorite_product_list = crud.get_user_favorites(user_id)
    return jsonify(favorite_product_list)


@userProfileAPI.route('/api/toggle-favorite',methods=['POST'])
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


@userProfileAPI.route('/api/change-user-data',methods=['POST'])
def post_user_data():

    #  GET DATA
    # ****************************** #
    data = request.get_json()

    user_id = data['user_id']
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']
    profilePhoto = data['profilePhoto']
    # ****************************** #

    updatedUser = crud.post_user_data(user_id,password=password,fname=fname,lname=lname,email=email,profilePhoto=profilePhoto)
    updated_user_info = {'fname': updatedUser.fname,
                'id': updatedUser.user_id}

    return jsonify ({'status':'Account Updated', 'user': updated_user_info})