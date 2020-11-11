"""CRUD operations."""
# from flask import Flask, render_template, request, flash, session, redirect ,jsonify
from model import db, User, connect_to_db, Product, Certification
import datetime

# Functions start here!

def create_user(fname,lname,email,password):
    now = datetime.datetime.now()
    new_user= User(fname=fname, lname=lname, email=email, password=password, date_added= now, date_modified= now)

    db.session.add(new_user)
    db.session.commit()
    return new_user

def add_product(productName,productUrl,company,description):
    user = 1
    now = datetime.datetime.now()

    new_product= Product(title=productName,
                        url=productUrl,
                        company=company,
                        description=description,
                        user_id=user,
                        date_added=now,
                        date_modified=now)

    db.session.add(new_product)
    db.session.commit()

    return new_product

def return_bcorp():

    bcorps = []
    all_bcorps =  Certification.query.filter(Certification.certification == 'Bcorp').all()
    for corp in all_bcorps:
        if corp.company_certified not in bcorps:
            bcorps.append(corp.company_certified)
    return bcorps

def get_users():
    """Returns users in db."""

    users = User.query.all()

    return users

def get_user_by_email(email):
    ''' return a user by email'''

    return User.query.filter(User.email == email).first()

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

