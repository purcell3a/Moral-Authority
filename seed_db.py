"""Script to seed database."""

import os
# This is a module from Python’s standard library. It contains 
# code related to working with your computer’s operating system.
import json
from random import choice, randint
from datetime import datetime
import csv

# import crud
import model
import server

os.system('dropdb moralauthority')

os.system('createdb moralauthority')

# After that, you connect to the database and call db.create_all:
model.connect_to_db(server.app)
model.db.create_all()


#  used geeksforgeeks to work with csv

filename = 'data/B_Corp_Impact_Data.csv'

# initializing the titles and rows list 
# fields = [] 
# rows = [] 
  
# reading csv file 
# with open(filename, 'r') as csvfile: 
    # creating a csv reader object 
    # csvreader = csv.reader(csvfile) 
      
    # extracting field names through first row 
    # fields = next(csvreader) 

    # extracting each data row one by one 
    # for row in csvreader: 
    #     rows.append(row) 
  
    # get total number of rows 
    # print("Total no. of rows: %d"%(csvreader.line_num)) 
  
# printing the field names 
# print('Field names are:' + ', '.join(field for field in fields)) 
  
# #  printing first 5 rows 
# print('\nFirst 5 rows are:\n') 
# for row in rows[:5]: 
#     # parsing each column of a row 
#     for col in row: 
#         print("%10s"%col), 
#     print('\n') 

# ***************************************************************************

# movies_in_db = []
# for movie in movie_data:
#     title, description, poster_path = (movie['title'],
#                                     movie['overview'],
#                                     movie['poster_path'])
#     release_date = datetime.strptime(movie['release_date'], '%Y-%m-%d')

#     db_movie = crud.create_movie(title,
#                                  description,
#                                  release_date,
#                                  poster_path)
#     movies_in_db.append(db_movie)


# for n in range(10):
#     email = f'user{n}@test.com' 
#     password = 'test'

#     user = crud.create_user(email, password)

#     for _ in range(10):
#         random_movie = choice(movies_in_db)
#         score = randint(1, 5)

#         crud.create_rating(user, random_movie, score)





#    openfile = open('cohort_data.txt')
#     house = []
#     for line in openfile:
#       line  = line.rstrip()
#       words = line.split('|')
#       if len(words[2]) > 0 :
#         house.append(words[2])
#         houses = set(house)