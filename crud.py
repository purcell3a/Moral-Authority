"""CRUD operations."""
from flask import Flask, render_template, request, flash, session, redirect ,jsonify
from model import db, User, connect_to_db, Product, Certification,Category, Favorite,ProductCertification,ProductImage, Subcategory
import datetime
import random

import logging

logger = logging.getLogger(__name__)
# TODO LEARN ABOUT LOGGER
logger.warning('informative message here')
#TODO ADD DATE UPDATED TO UPDATE FUNCTIONS

#  <================================ IN PROGRESS ==================================>

def get_search_parameters_by_subcategory(subcategory,user_id=0):
        # ! still returning tuples

    search_data = {}
    product_types = db.session.query(Product.product_type).join(Subcategory, Product.subcategory_id == Subcategory.subcategory_id).filter(Subcategory.title == subcategory).distinct().all()
    product_companies = db.session.query(Product.company).join(Subcategory, Product.subcategory_id == Subcategory.subcategory_id).filter(Subcategory.title == subcategory).distinct().all()

    search_data['companies'] = product_companies
    search_data['types'] = product_types
    print(search_data)
    return search_data


def get_subcategory_id(subcategorytitle):
    subcategory_id = db.session.query(Subcategory.subcategory_id).select_from(Subcategory).filter(Subcategory.title == subcategorytitle).first()

    return subcategory_id[0]

def get_subcategory(departmentTitle):
    result = []
    subcategories = db.session.query(Subcategory.title).select_from(Subcategory).join(Category, Category.category_id == Subcategory.category_id).filter(Category.title == departmentTitle).all()
    for subcategory in subcategories:
        result.append(subcategory[0])
    return result


def get_departments_subcateogries():

    departments_subcategories= {}
    all_departments = db.session.query(Category.title).select_from(Category).all()
    for department in all_departments:
            subcats = get_subcategory(department)
            departments_subcategories[department[0]] = subcats
    return departments_subcategories

def delete_product():

    product1 = Product.query.filter(Product.product_id == 1)
    product2 = Product.query.filter(Product.product_id == 2)

    Product.query.filter(Product.product_id == 1).delete()
    db.session.commit()

def post_product_image(product_id, url):

    new_product_image = ProductImage(product_id = product_id,
                                        url = url,
                                        date_added = '2020-11-21',
                                        date_modified = '2020-11-21')
    db.session.add(new_product_image)

    db.session.commit()
    return new_product_image


def put_product(img_id,title,company,url,description,product_id):

    product = db.session.query(Product).get(product_id)
    product.title=title
    product.company = company
    product.url = url
    product.description = description
    product.img_id = img_id

    db.session.commit()

    return product.img_id


#  <================================ USER INFO ==================================>

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


def post_user(fname,lname,email,password):
    now = datetime.datetime.now()
    new_user= User(fname=fname, lname=lname, email=email, password=password,profile_img ='static/img/stock-profile-img.png',date_added=now, date_modified= now)

    db.session.add(new_user)
    db.session.commit()
    return new_user


def put_user_data(user_id,fname,lname,email,password,profilePhoto):
    now = datetime.datetime.now()
    user = User.query.get(user_id)

    if fname and user.fname != fname:
        user.fname = fname

    if lname and user.lname != lname:
        user.lname = lname


    if email and user.email != email:
        user.email = email


    if password and user.password != password:
        user.password = password

    if profilePhoto and user.profile_img != profilePhoto:
        user.profile_img = profilePhoto

    db.session.commit()

    return user


def get_user_favorite_product_id_list(user_id):

    favorite_product_id_list = []
    favorites = Favorite.query.filter(Favorite.user_id == user_id).all()
    for favorite in favorites:
        favorite_product_id_list.append(favorite.product_id)
    return favorite_product_id_list


def get_user_favorites(user_id):

    result = []
    products = db.session.query(Product).select_from(Product).join(Favorite, Favorite.product_id == Product.product_id).filter(Favorite.user_id == user_id).all()

    for product in products:
        img = get_product_img(product.img_id)
        productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id,
                    'img_id':img,
                    'company': product.company,
                    'url': product.url,
                    'product_favorite': 'True'}
        result.append(productObject)
    return result


def get_user_favorite(user_id, product_id):

    user_favorite = Favorite.query.filter(Favorite.user_id == user_id , Favorite.product_id == product_id).first()

    return user_favorite


def post_user_favorite(user_id,product_id):

    now = datetime.datetime.now()
    new_favorite = Favorite(user_id = user_id,
                            product_id = product_id,
                            date_added = now,
                            date_modified = now)
    db.session.add(new_favorite)
    db.session.commit()


def delete_user_favorite(user_id,product_id):

    favorite = Favorite.query.filter(Favorite.user_id == user_id, Favorite.product_id == product_id).first()

    db.session.delete(favorite)
    db.session.commit()

#  <================================ DEPARTMENTS AND CERTIFICATIONS ==================================>


def get_bcorps():

    company_list = []
    all_bcorps = Certification.query.filter(Certification.certification == 'Bcorp').all()
    for cert in all_bcorps:
        company_list.append(cert.certifying_company)

    return company_list

def get_category_id(title):

    result = Category.query.filter(Category.title == title).first()

    return result.category_id


def filter_by_department(category_id):

    product_id_list = []
    result = db.session.query(Product.product_id).filter(Product.category_id == category_id).all()
    for product_id in result:
        product_id_list = product_id_list + (list(product_id))
    return product_id_list

def get_product_ids_made_by_bcorps_in_department(category_id):

    result = []
    product_tuples = db.session.query(Product.product_id).select_from(Product).join(Certification, Product.company == Certification.company_certified).filter(Certification.certification == 'Bcorp',Product.category_id == category_id).all()
    for product_id in product_tuples:
        if product_id[0] not in result:
            result.append(product_id[0])
    return result

def return_bcorp():

    bcorps = []
    all_bcorps =  Certification.query.filter(Certification.certification == 'Bcorp').all()
    for corp in all_bcorps:
        if corp.certifying_company not in bcorps:
            bcorps.append(corp.certifying_company)
    return bcorps

def get_cert_id_by_title(title):

    cert = Certification.query.filter(Certification.certification == title).first()

    return (cert.cert_id)


def return_certifications():

    certifications_list = []
    all_certifications = Certification.query.all()
    for certifications in all_certifications:
        if certifications.certification not in certifications_list:
            certifications_list.append(certifications.certification)
    return (certifications_list)


def return_departments():

    departments= []
    all_departments = db.session.query(Category.title).select_from(Category).all()
    for department in all_departments:
            departments.append(department[0])
    return departments

# def post_new_category(category):
#     now = datetime.datetime.now()

#     new_category = Category( title=category,
#                             date_added=now,
#                             date_modified=now)
#     db.session.add(new_category)
#     db.session.commit()

# def add_new_certification(title):

#     now = datetime.datetime.now()
#     new_cert= Certification(certifying_company = 'might delete this column',
#                                 certification = title,
#                                 rating = 100,
#                                 max_rating = 100,
#                                 date_added = now,
#                                 date_modified = now)
#     db.session.add(new_cert)
#     db.session.commit()



#  <================================ PRODUCTS ==================================>

def post_image(img_url,product_id):
    now = datetime.datetime.now()
    new_image= ProductImage(product_id=product_id,
                        url=img_url,
                        date_added=now,
                        date_modified=now)

    db.session.add(new_image)
    db.session.commit()

    return new_image.image_id

def get_product_id_by_cert_id(cert_id,category_id):
    product_id_list =[]
    result = db.session.query(Product.product_id).select_from(Product).join(ProductCertification, Product.product_id == ProductCertification.product_id).filter(Product.category_id == category_id, ProductCertification.cert_id == cert_id).all()
    for products in result:
        product_id_list.append(products.product_id)
    return product_id_list

def get_product_id(productName,user_id):

    product_id = Product.query.filter(Product.title == productName,Product.user_id == user_id).first()
    return product_id.product_id

def get_product_img(img_id):
    image = db.session.query(ProductImage.url).select_from(ProductImage).filter(ProductImage.image_id == img_id).first()
    return image[0]

def put_product_image(img_id,product_id):

    product = Product.query.filter(Product.product_id==product_id).first()
    product.img_id = img_id

    db.session.commit()

def post_product(productName,productUrl,company,description,category_id,subcategory_id,user_id=1,img_id=1):

    now = datetime.datetime.now()
    new_product= Product(title=productName,
                        url=productUrl,
                        company=company,
                        description=description,
                        user_id=user_id,
                        date_added=now,
                        date_modified=now,
                        category_id=category_id,
                        subcategory_id =subcategory_id,
                        img_id=img_id)

    db.session.add(new_product)
    db.session.commit()

    return new_product


def get_recently_added_products(user_id):

    productList= []

    recent_product_tuples = db.session.query(Product).select_from(Product).limit(3).all()
    for product in recent_product_tuples:
        favorite = product.favorite
        img = get_product_img(product.img_id)
        if favorite and favorite[0].user_id == user_id:
            product_favorite = 'True'
        else:
            product_favorite = 'False'
        productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id,
                    'img_id':img,
                    'company': product.company,
                    'url': product.url,
                    'product_favorite':product_favorite}
        productList.append(productObject)

    return productList

def add_product_certifications(product_id,cert_id):
    now = datetime.datetime.now()
    new_ProductCertification = ProductCertification(product_id = product_id,
                                                    cert_id = cert_id,
                                                    date_added = now,
                                                    date_modified = now)
    db.session.add(new_ProductCertification)
    db.session.commit()

def get_product_info(productId):

    product = Product.query.filter(Product.product_id == productId).first()
    img = get_product_img(product.img_id)
    product = {'title':product.title,
                'description': product.description,
                'product_id' : product.product_id,
                'img_id':img,
                'company': product.company,
                'url': product.url,}
    return product

def get_products_by_subcategory(subcategory,user_id=0):
        # ! To scale would need to paginate

    productList= []

    product_tuples = db.session.query(Product).select_from(Product).join(Subcategory, Product.subcategory_id == Subcategory.subcategory_id).filter(Subcategory.title == subcategory).all()
    for product in product_tuples:
        favorite = product.favorite
        img = get_product_img(product.product_id)
        if favorite and user_id != 0:
            product_favorite = 'True'
        else:
            product_favorite = 'False'
        productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id,
                    'img_id':img,
                    'product_type':product.product_type,
                    'company': product.company,
                    'url': product.url,
                    'product_favorite':product_favorite}
        productList.append(productObject)
    return productList


def get_products_by_department(department,user_id=0):
    # ! To scale would need to paginate

    productList= []

    product_tuples = db.session.query(Product).select_from(Product).join(Category, Product.category_id == Category.category_id).filter(Category.title == department).all()

    for product in product_tuples:
        favorite = product.favorite
        img = get_product_img(product.img_id)
        if favorite and user_id != 0:
            product_favorite = 'True'
        else:
            product_favorite = 'False'
        productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id,
                    'img_id':img,
                    'company': product.company,
                    'url': product.url,
                    'product_favorite':product_favorite}
        productList.append(productObject)
    return productList


def get_products_added_by_user(user_id):

    #TODO fix this with a join query this is too slow for scaling

    products = Product.query.filter(Product.user_id == user_id).all()
    productList = []

    for product in products:
        is_favorite = Favorite.query.filter(Favorite.product_id == product.product_id, Favorite.user_id == user_id).first()
        img = get_product_img(product.img_id)
        if is_favorite:
            product_favorite = 'True' 
        else:
            product_favorite = 'False'
        productObject = {'title':product.title,
                    'description': product.description,
                    'product_id' : product.product_id,
                    'img_id':img,
                    'company': product.company,
                    'url': product.url,
                    'product_favorite':product_favorite}
        productList.append(productObject)
    return productList


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

