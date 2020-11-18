"""CRUD operations."""
# from flask import Flask, render_template, request, flash, session, redirect ,jsonify
from model import db, User, connect_to_db, Product, Certification,Category
import datetime

# Functions start here!

def create_user(fname,lname,email,password):
    now = datetime.datetime.now()
    new_user= User(fname=fname, lname=lname, email=email, password=password, date_added= now, date_modified= now)

    db.session.add(new_user)
    db.session.commit()
    return new_user


def change_user_data(fname,lname,email,password,user_id):
    now = datetime.datetime.now()
    user = User.query.get(user_id)

    if user.fname != fname:
        user.fname = fname

    if user.lname != lname:
        user.lname = lname

    if user.email != email:
        user.email = email

    if user.password != password:
        user.password = password

    user.user_id = user_id

    db.session.commit()

def add_new_category(category):
    now = datetime.datetime.now()

    new_category = Category( title=category,
                            date_added=now,
                            date_modified=now)
    db.session.add(new_category)
    db.session.commit()

def get_category_id(title):

    categoryObject = Category.query.filter(Category.title == title).first()
    return categoryObject.category_id


def add_product(productName,productUrl,company,description,category_id):
    user = 1
    now = datetime.datetime.now()
    new_product= Product(title=productName,
                        url=productUrl,
                        company=company,
                        description=description,
                        user_id=user,
                        date_added=now,
                        date_modified=now,
                        category_id=category_id)


    db.session.add(new_product)
    db.session.commit()

    return new_product


def get_products():

    all_products =  Product.query.all()
    productList= []
    for product in all_products:
        productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id}
        productList.append(productObject)
    return productList


def get_product_info(productId):

    product = Product.query.filter(Product.product_id == productId).first()

    return product

def filter_by_department_and_certification(category_id):

    result =  Product.query.filter(category_id == category_id).all()
    print('crud result=', result)
    return result

def return_bcorp():

    bcorps = []
    all_bcorps =  Certification.query.filter(Certification.certification == 'Bcorp').all()
    for corp in all_bcorps:
        if corp.company_certified not in bcorps:
            bcorps.append(corp.company_certified)
    return bcorps

def add_new_certification(title):

    now = datetime.datetime.now()
    new_cert= Certification(company_certified = 'might delete this column',
                                certification = title,
                                rating = 100,
                                max_rating = 100,
                                date_added = now,
                                date_modified = now)

    db.session.add(new_cert)
    db.session.commit()

    return new_cert


def return_certifications():

    certifications_list = []
    all_certifications = Certification.query.all()
    for certifications in all_certifications:
        if certifications.certification not in certifications_list:
            certifications_list.append(certifications.certification)
    return (certifications_list)


def return_departments():

    departments= []
    all_departments = Category.query.all()
    for department in all_departments:
        if department.title not in departments:
            departments.append(department.title)
    return departments


def get_users():
    """Returns users in db."""

    users = User.query.all()

    return users



def get_user_by_email(email):
    ''' return a user by email'''

    result = User.query.filter(User.email == email).first()
    user = { 'email': result.email,
            'fname' : result.fname,
            'lname' : result.lname,
            'password' : result.password,
            'user_id' : result.user_id}

    return user


def does_user_exist(email):
    ''' return a user by email'''

    result = User.query.filter(User.email == email).first()

    if result is not None:
        return ('user exists')
    else:
        return('user does not exist')


def validate_user(password,email):
    """checks for valid password on login"""

    return User.query.filter(User.password == password, User.email == email).first()


def get_user_by_id(user_id):
    """Returns user based on id"""

    user = User.query.get(user_id)

    return user


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

