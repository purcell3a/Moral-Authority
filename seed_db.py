"""Script to seed database."""

import os
# This is a module from Python’s standard library. It contains
# code related to working with your computer’s operating system.
import json
from random import choice, randint
from datetime import datetime
import csv

# import crud
from model import db, connect_to_db, Certification, Category
import server

os.system('dropdb moralauthority')

os.system('createdb moralauthority')

# After that, you connect to the database and call db.create_all:
connect_to_db(server.app)
db.create_all()


#  used geeksforgeeks to work with csv

filename = 'data/B_Corp_Impact_Data.csv'

# ************************************************************************************
with open(filename, 'r') as file:
    csv_file = csv.DictReader(file)
    for row in csv_file:
        certifications = Certification(company_certified = row['company_name'].strip(),
                                        certification = 'Bcorp',
                                        cert_status = row['current_status'].strip(),
                                        cert_url = row['b_corp_profile'].strip(),
                                        rating = row['overall_score'].strip(),
                                        max_rating = '200',
                                        date_added = '11-04-2020',
                                        date_modified = '11-04-2020')

        db.session.add(certifications)

    for department in ['Beauty & Health', 'Home & Garden', 'Clothing, Shoes & Accessories']:
        new_category = Category(title=department,
                                date_added='2020-11-21',
                                date_modified='2020-11-21')
        db.session.add(new_category)


    for certification in ['EWG', 'FairTrade', 'Leaping Bunny']:
        new_certification = Certification(company_certified = 'might delete this column',
                                    certification = certification,
                                    rating = 100,
                                    max_rating = 100,
                                    date_added = '2020-11-21',
                                    date_modified = '2020-11-21')
        db.session.add(new_certification)

    db.session.commit()

# ***************************************************************************
