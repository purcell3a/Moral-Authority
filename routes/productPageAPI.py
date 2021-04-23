from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets


productPageAPI = Blueprint('productPageAPI',__name__)

@productPageAPI.route('/api/product-info',methods=['POST'])
def return_product_info():
    """Returns product info for Product page"""
    data = request.get_json()
    productId = data['productId']
    product_info = crud.get_product_info(productId)
    return jsonify(product_info)
