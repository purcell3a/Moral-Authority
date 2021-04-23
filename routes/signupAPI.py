from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
import cloudinary

signupAPI = Blueprint('signupAPI',__name__)


@signupAPI.route('/api/signup', methods=["POST"])
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