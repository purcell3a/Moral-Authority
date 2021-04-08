"""Script to seed database."""

import os
# This is a module from Python’s standard library. It contains
# code related to working with your computer’s operating system.
import json
from random import choice, randint
from datetime import datetime
import csv

# import crud
from model import db, connect_to_db, Certification, Category,Product, ProductImage,User,Subcategory,ProductCertification
import server

os.system('dropdb moralauthority')

os.system('createdb moralauthority')

# After that, you connect to the database and call db.create_all:
connect_to_db(server.app)
db.create_all()


#  used geeksforgeeks to work with csv

bcorpInfo = 'data/B_Corp_Impact_Data.csv'
categories = 'data/categories.csv'
ewgProducts = 'data/ewg.csv'

# ************************************************************************************
with open(bcorpInfo, 'r') as file:
    csv_file = csv.DictReader(file)
    for row in csv_file:
        certifications = Certification(certifying_company = row['company_name'].strip(),
                                        certification = 'Bcorp',
                                        cert_status = row['current_status'].strip(),
                                        cert_url = row['b_corp_profile'].strip(),
                                        rating = row['overall_score'].strip(),
                                        max_rating = '200',
                                        date_added = '11-04-2020',
                                        date_modified = '11-04-2020')

        db.session.add(certifications)
        db.session.commit()

    for department in ['Beauty & Health', 'Home & Garden', 'Clothing, Shoes & Accessories']:
        new_category = Category(title=department,
                                date_added='2020-11-21',
                                date_modified='2020-11-21')
        db.session.add(new_category)
        db.session.commit()

    with open(categories, 'r') as file:
        csv_file = csv.DictReader(file)
        for row in csv_file:
            new_subcategory = Subcategory(title=row['subcategory'].strip(),
                                        category_id=row['categoryID'].strip(),
                                        date_added='2020-11-21',
                                        date_modified='2020-11-21')
            db.session.add(new_subcategory)
            db.session.commit()



    for certification in ['EWG', 'FairTrade', 'Leaping Bunny','Plastic Free','Vegan','LGBTQ+ Owned','Woman Owned','BIPOC-owned','Organic']:
        new_certification = Certification(certifying_company= 'might delete this column',
                                    certification = certification,
                                    rating = 100,
                                    max_rating = 100,
                                    date_added = '2020-11-21',
                                    date_modified = '2020-11-21')
        db.session.add(new_certification)
        db.session.commit()

    new_user = User(fname = 'User',
                    lname ='user',
                    email = 'user@gmail.com',
                    password = 'user',
                    profile_img = 'https://www.pakstockexchange.com/stock3/profile_pictures/no-profile-picture.png',
                    date_added = '2020-11-21',
                    date_modified = '2020-11-21')
    db.session.add(new_user)
    db.session.commit()

    def add_image(img_url,product_id):
        new_image= ProductImage(product_id=product_id,
                            url=img_url,
                            date_added='2020-11-21',
                            date_modified='2020-11-21')

        db.session.add(new_image)
        db.session.commit()
        return new_image.image_id

    def update_product_image(img_id,product_id):

        product = Product.query.filter(Product.product_id==product_id).first()
        product.img_id = img_id

        db.session.commit()


    def get_product_id(productName,user_id):

        product_id = Product.query.filter(Product.title == productName,Product.user_id == user_id).first()
        return product_id.product_id

    ewgProductdic = []
    with open(ewgProducts, 'r') as file:
        csv_file = csv.DictReader(file)
        for row in csv_file:
            subcat = row['Subcategory'].strip()
            subcategory_id = db.session.query(Subcategory.subcategory_id).select_from(Subcategory).filter(Subcategory.title == subcat).first()
            product = Product(title = row['Title'].strip(),
                                            company = row['Brand'].strip(),
                                            url = row['Link'].strip(),
                                            description = row['Where To Find'].strip(),
                                            category_id = 1,
                                            subcategory_id = subcategory_id[0],
                                            product_type = row['Type'].strip(),
                                            user_id = 1,
                                            date_added = '11-04-2020',
                                            date_modified = '11-04-2020')
            img =  row['Image'].strip()
            db.session.add(product)

            ewgProductdic.append((product,img))
            db.session.commit()



    for product in ewgProductdic:
        product,img_url = product
        productcert =  ProductCertification(
                            product_id = product.product_id,
                            cert_id = 1,
                            date_added = '11-04-2020',
                            date_modified = '11-04-2020')
        image_id = add_image(img_url,product.product_id)
        update_product_image(image_id,product.product_id)

        db.session.add(productcert)
        db.session.commit()


    new_product = Product(title = 'Product1',
                         company = 'company',
                          url = 'none',
                          description = 'test product',
                            category_id = 1,
                            subcategory_id = 1,
                            user_id = 1,
                            date_added = '2020-11-21',
                            date_modified = '2020-11-21')
    db.session.add(new_product)
    db.session.commit()

    for photo in ['https://res.cloudinary.com/purcella/image/upload/v1607216629/testFolder/image_bpi3xn.jpg']:
        new_product_image = ProductImage(product_id = 1,
                                        url = photo,
                                        date_added = '2020-11-21',
                                        date_modified = '2020-11-21')
        db.session.add(new_product_image)
    db.session.commit()


# ***************************************************************************
