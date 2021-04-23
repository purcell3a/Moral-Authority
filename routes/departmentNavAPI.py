
from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify,Blueprint)
from model import connect_to_db, db, User
import crud
import cloudinary



departmentNavAPI = Blueprint('departmentNavAPI',__name__)

@departmentNavAPI.route('/api/list-departments-subcategories')
def get_departments_subcateogries():
    ''' return list of departments/categories'''
    departments_categories = crud.get_departments_subcateogries()
    return jsonify(departments_categories)