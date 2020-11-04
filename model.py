from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# *****************************************************************************

class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    fname = db.Column(db.String,
                        nullable=False, 
                        unique=False)
    lname = db.Column(db.String,
                        nullable=False, 
                        unique=False)
    email = db.Column(db.String,
                        nullable=False, 
                        unique=True)
    password = db.Column(db.String,
                        nullable=False)
    favorite = db.Column(db.Integer,
                        nullable=True)
    product_add = db.Column(db.Integer,
                        nullable=True)
    rating = db.Column(db.Integer,
                        nullable=True)

    def __repr__(self):
        return f'<User user_id={self.user_id} fname ={self.fname} lname={self.lname} email={self.email} password={self.password} favorite={self.favorite} product_add={self.product_add} rating={self.rating}>'

class Favorite(db.Model):
    """A users favorite product."""

    __tablename__ = 'favorites'

    favorite_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key= True)
    category = db.Column(db.Integer, 
                        db.ForeignKey('users.user_id'))
    product = db.Column(db.Integer, 
                        db.ForeignKey('users.user_id'))

    # movie = db.relationship('Movie', backref='ratings')
    # user = db.relationship('User', backref='ratings')

    def __repr__(self):
        return f'<Favorite favorite_id ={self.favorite_id } category={self.category} product={self.product}>'

class Category(db.Model):
    """A category."""

    __tablename__ = 'categories'

    category_id = db.Column(db.Integer,
                        nullable=False)
    title = db.Column(db.String,
                        autoincrement=True,
                        primary_key=True)
    subcategory = db.Column(db.Integer,
                        nullable=False)

    def __repr__(self):
        return f'<Category category_id={self.category_id} title={self.title} subcategory={self.subcategory}>'

class Subcategory(db.Model):
    """A category."""

    __tablename__ = 'subcategories'

    subcategory_id = db.Column(db.Integer,
                        nullable=False)
    title = db.Column(db.String,
                        autoincrement=True,
                        primary_key=True)

    def __repr__(self):
        return f'<Subcategory subcategory_id ={self.subcategory_id } title={self.title}>'


class Certification(db.Model):
    """A category."""

    __tablename__ = 'certifications'

    certification_id = db.Column(db.Integer,
                        nullable=False)
    company = db.Column(db.String,
                        autoincrement=True,
                        primary_key=True)


    def __repr__(self):
        return f'<Certification certification_id={self.certification_id} company={self.company}>'



class Product(db.Model):
    """A category."""

    __tablename__ = 'products'

    product_id = db.Column(db.Integer,
                        nullable=False,
                        primary_key=True)
    title = db.Column(db.String,
                        autoincrement=True)
    url = db.Column(db.String,
                        autoincrement=True)
    description = db.Column(db.String,
                        autoincrement=True)
    category = db.Column(db.Integer,
                        nullable=False)
    subcategory = db.Column(db.Integer,
                        nullable=False)

    def __repr__(self):
        return f'<Product product_id={self.product_id} title={self.title} description={self.description} url={self.url} category={self.category} subcategory={self.subcategory},>'

class Product_Add(db.Model):
    """A category."""

    __tablename__ = 'productsadded'

    product_id = db.Column(db.Integer,
                        nullable=False,
                        primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)

    title = db.Column(db.String,
                        autoincrement=True)
    url = db.Column(db.String,
                        autoincrement=True)
    description = db.Column(db.String,
                        autoincrement=True)
    category = db.Column(db.Integer,
                        nullable=False)
    subcategory = db.Column(db.Integer,
                        nullable=False)

    def __repr__(self):
        return f'<User product_id={self.product_id} user_id={self.user_id} title ={self.title} url={self.url} description={self.description} category={self.category} subcategory={self.subcategory}>'

def connect_to_db(flask_app, db_uri='postgresql:///ratings', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

# *****************************************************************************


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    connect_to_db(app)
    # print("Connected to DB.")