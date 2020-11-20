"""CRUD operations."""
# from flask import Flask, render_template, request, flash, session, redirect ,jsonify
from model import db, User, connect_to_db, Product, Certification,Category, Favorite,ProductCertification
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

def get_user_favorite_product_id_list(user_id):

    favorite_product_id_list = []
    favorites = Favorite.query.filter(Favorite.user_id == user_id).all()
    for favorite in favorites:
        favorite_product_id_list.append(favorite.product_id)
    return favorite_product_id_list


def add_new_category(category):
    now = datetime.datetime.now()

    new_category = Category( title=category,
                            date_added=now,
                            date_modified=now)
    db.session.add(new_category)
    db.session.commit()

def get_category_id(title):

    result = Category.query.filter(Category.title == title).first()
    return result.category_id


def add_user_favorite(user_id,product_id):

    now = datetime.datetime.now()
    new_favorite = Favorite(user_id = user_id,
                            product_id = product_id,
                            date_added = now,
                            date_modified = now)
    db.session.add(new_favorite)
    db.session.commit()

def add_product_certifications(product_id,cert_id):
    now = datetime.datetime.now()
    new_ProductCertification = ProductCertification(product_id = product_id,
                                                    cert_id = cert_id,
                                                    date_added = now,
                                                    date_modified = now)
    db.session.add(new_ProductCertification)
    db.session.commit()


def add_product(productName,productUrl,company,description,category_id,user_id):
    user = 1
    now = datetime.datetime.now()
    new_product= Product(title=productName,
                        url=productUrl,
                        company=company,
                        description=description,
                        user_id=user_id,
                        date_added=now,
                        date_modified=now,
                        category_id=category_id)

    db.session.add(new_product)
    db.session.commit()

    return new_product


def get_recently_added_products():
    productList= []
    recent_products = Product.query.order_by(Product.date_added.desc()).limit(4).all()
#  DON'T FORGET TO ADD IMAGES LATER BC YOU'RE LAZY
    for product in recent_products:
                productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id}
                productList.append(productObject)
    return productList


def get_products():

    all_products =  Product.query.all()
    productList= []
    for product in all_products:
        productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id}
        productList.append(productObject)
    return productList


def get_products_added_by_user(user_id):
    products = Product.query.filter(Product.user_id == user_id).first()

    return products

def get_product_info(productId):

    product = Product.query.filter(Product.product_id == productId).first()

    return product


def get_product_id_by_cert_id(cert_id):
    product_id_list =[]
    result = ProductCertification.query.filter(ProductCertification == cert_id).all()
    for products in result:
        product_id_list.append(products.product_id)
    return  product_id_list

def filter_by_department_and_certification(category_id,product_id):
    print('*****************************************************************')
    print('*****************************************************************')
    print('*****************************************************************')
    result =  Product.query.filter(Product.category_id == category_id, Product.product_id == product_id).all()
    print('crud result=', result)
    return result

def filter_by_department(category_id):
    print('*****************************************************************')
    print('*****************************************************************')
    print('*****************************************************************')
    result =  Product.query.filter(Product.category_id == category_id).all()
    print('crud result=', result)
    return result

def get_bcorp_id(company):
    bcorp = Certification.query.filter(Certification.company_certified == company).first()
    print('bcorp.cert_id =',bcorp.cert_id)
    return (bcorp.cert_id)

def return_bcorp():

    bcorps = []
    all_bcorps =  Certification.query.filter(Certification.certification == 'Bcorp').all()
    for corp in all_bcorps:
        if corp.company_certified not in bcorps:
            bcorps.append(corp.company_certified)
    return sorted(bcorps)

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

    print('new_cert',new_cert)


def get_product_id(productName,user_id):

    product_id = Product.query.filter(Product.title == productName,Product.user_id == user_id).first()
    return product_id.product_id

def get_cert_it_by_title(title):

    cert_id = Certification.query.filter(Certification.certification == title).first()

    return (cert_id.cert_id)


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

