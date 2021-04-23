from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets

loginAPI = Blueprint('loginAPI',__name__)

@loginAPI.route('/api/login', methods=["POST"])
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