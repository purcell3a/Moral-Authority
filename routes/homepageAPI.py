from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets


homepageAPI = Blueprint('homepageAPI',__name__)


@homepageAPI.route('/api/recently-added', methods=["POST"])
def recently_added_products():

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = int(data['user_id'])
    # ****************************** #

    recentProducts = crud.get_recently_added_products(user_id)

    return jsonify(recentProducts)