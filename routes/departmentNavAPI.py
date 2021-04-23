
from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import cloudinary
import secrets


departmentNavAPI = Blueprint('departmentNavAPI',__name__)

@departmentNavAPI.route('/api/list-departments-subcategories')
def get_departments_subcateogries():
    ''' return list of departments/categories'''
    departments_categories = crud.get_departments_subcateogries()
    return jsonify(departments_categories)