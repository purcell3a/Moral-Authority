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
    profile_img = db.Column(db.String)
    email = db.Column(db.String,
                        nullable=False,
                        unique=True)
    password = db.Column(db.String,
                        nullable=False)
    date_added = db.Column(db.DateTime,nullable=False)
    date_modified = db.Column(db.DateTime,nullable=False)

    def __repr__(self):
        return (f'<User user_id={self.user_id} fname ={self.fname} lname={self.lname} '
                f'email={self.email} password={self.password} date_added={self.date_added} date_modified={self.date_modified}>')


class Favorite(db.Model):
    """A users favorite product."""

    __tablename__ = 'favorites'

    favorite_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key= True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))
    product_id = db.Column(db.Integer,
                        db.ForeignKey('products.product_id'))
    date_added = db.Column(db.DateTime,nullable=False)
    date_modified = db.Column(db.DateTime,nullable=False)


    def __repr__(self):
        return (f'<Favorite favorite_id ={self.favorite_id } user_id={self.user_id} product_id={self.product_id}'
                f'date_added={self.date_added} date_modified={self.date_modified}>')


class Category(db.Model):
    """A category."""

    __tablename__ = 'categories'

    category_id = db.Column(db.Integer,
                        autoincrement=True,
                        nullable=False,
                        primary_key=True)
    title = db.Column(db.String,nullable=False, unique=True)
    date_added = db.Column(db.DateTime,nullable=False)
    date_modified = db.Column(db.DateTime,nullable=False)

    def __repr__(self):
        return (f'<Category category_id={self.category_id} title={self.title}'
                f' date_added={self.date_added} date_modified={self.date_modified}>')


class Subcategory(db.Model):
    """A category."""

    __tablename__ = 'subcategories'

    subcategory_id = db.Column(db.Integer,
                        autoincrement=True,
                        unique=True,
                        nullable=False,
                        primary_key=True)
    title = db.Column(db.String,
                        primary_key=True)
    category_id = db.Column(db.Integer,
                        db.ForeignKey('categories.category_id'))
    date_added = db.Column(db.DateTime, nullable=False)
    date_modified = db.Column(db.DateTime, nullable=False,)

    def __repr__(self):
        return (f'<Subcategory subcategory_id={self.subcategory_id} title={self.title} category_id={self.category_id}'
                f'date_added={self.date_added} date_modified={self.date_modified}>')


class Certification(db.Model):
    """A category."""
    __tablename__ = 'certifications'

    cert_id = db.Column(db.Integer,
                        autoincrement = True,
                        nullable=False,
                        primary_key=True)
    certifying_company = db.Column(db.String,
                        nullable=False,)
    certification = db.Column(db.String,
                        nullable=False,)
    cert_status = db.Column(db.String)
    cert_url = db.Column(db.String)
    rating = db.Column(db.Float)
    max_rating = db.Column(db.Integer)
    date_added = db.Column(db.DateTime,nullable=False,)
    date_modified = db.Column(db.DateTime,nullable=False,)

    def __repr__(self):
        return (f'<Certification cert_id={self.cert_id} certifying_company={self.certifying_company} rating={self.rating}'
                f'max_rating={self.max_rating} date_added={self.date_added} date_modified={self.date_modified}>')



class Product(db.Model):
    """A Product"""

    __tablename__ = 'products'

    product_id = db.Column(db.Integer,
                        autoincrement=True,
                        nullable=False,
                        primary_key=True)
    title = db.Column(db.String,
                        nullable=False)
    company = db.Column(db.String,
                        unique=False,
                        nullable=False)
    url = db.Column(db.String,
                        nullable=False)
    description = db.Column(db.String,
                        nullable=True)
    category_id = db.Column(db.Integer,
                        db.ForeignKey('categories.category_id'),
                        nullable=True) # TODO change back to false after testing
    subcategory_id = db.Column(db.Integer,
                        db.ForeignKey('subcategories.subcategory_id'),
                        unique=True,
                        nullable=True) # TODO change back to false after testing
    img_id = db.Column(db.Integer,
                        db.ForeignKey('productimages.image_id'),
                        nullable=True) # TODO change back to false after testing
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    date_added = db.Column(db.DateTime,nullable=False,)
    date_modified = db.Column(db.DateTime,nullable=False,)

    favorite = db.relationship("Favorite")


    def __repr__(self):
        return (f'<Product product_id={self.product_id} title={self.title} img_id={self.img_id} company={self.company}'
                f'description={self.description} url={self.url} category_id ={self.category_id }date_added={self.date_added} date_modified={self.date_modified}>')


class ProductImage(db.Model):
    """A category."""

    __tablename__ = 'productimages'

    image_id = db.Column(db.Integer,
                        nullable=False,
                        primary_key=True)
    product_id = db.Column(db.Integer,
                        db.ForeignKey('products.product_id'),
                        nullable=False)
    url = db.Column(db.String)
    date_added = db.Column(db.DateTime,nullable=False,)
    date_modified = db.Column(db.DateTime,nullable=False,)

    def __repr__(self):
        return f'<ProductImage product_id={self.product_id} image_id={self.image_id} url={self.url} date_added={self.date_added} date_modified={self.date_modified}>'


class ProductCertification(db.Model):
    """A category."""

    __tablename__ = 'productcerts'

    productcert_id = db.Column(db.Integer,
                        autoincrement = True,
                        nullable=False,
                        primary_key=True)
    product_id = db.Column(db.Integer,
                        db.ForeignKey('products.product_id'),
                        nullable=False)
    cert_id = db.Column(db.Integer,
                        db.ForeignKey('certifications.cert_id'),
                        nullable=False)
    date_added = db.Column(db.DateTime,nullable=False,)
    date_modified = db.Column(db.DateTime,nullable=False,)

    def __repr__(self):
        return (f'<ProductCertification productcert_id={self.productcert_id} product_id={self.product_id} cert_id ={self.cert_id}'
                f'date_added={self.date_added} date_modified={self.date_modified}>')

class CompanyCertification(db.Model):
    """A category."""

    __tablename__ = 'companycerts'

    companycert_id = db.Column(db.Integer,
                        autoincrement = True,
                        nullable=False,
                        primary_key=True)
    company_id = db.Column(db.Integer,
                        db.ForeignKey('products.product_id'),
                        nullable=False)
    cert_id = db.Column(db.Integer,
                        db.ForeignKey('certifications.cert_id'),
                        nullable=False)
    date_added = db.Column(db.DateTime,nullable=False,)
    date_modified = db.Column(db.DateTime,nullable=False,)

    def __repr__(self):
        return (f'<CompanyCertification companycert_id={self.companycert_id} company_id={self.company_id} cert_id ={self.cert_id}'
                f'date_added={self.date_added} date_modified={self.date_modified}>')


class CompanyImage(db.Model):
    """A category."""

    __tablename__ = 'companyimages'

    image_id = db.Column(db.Integer,
                        nullable=False,
                        primary_key=True)
    company_id = db.Column(db.Integer,
                        db.ForeignKey('companies.company_id'),
                        nullable=False)
    url = db.Column(db.String)
    date_added = db.Column(db.DateTime,nullable=False,)
    date_modified = db.Column(db.DateTime,nullable=False,)

    def __repr__(self):
        return f'<CompanyImage company_id={self.company_id} image_id={self.image_id} url={self.url} date_added={self.date_added} date_modified={self.date_modified}>'

class Company(db.Model):
    """A Product"""

    __tablename__ = 'companies'

    company_id = db.Column(db.Integer,
                        autoincrement=True,
                        nullable=False,
                        primary_key=True)
    title = db.Column(db.String,
                        nullable=False)
    url = db.Column(db.String,
                        nullable=False)
    description = db.Column(db.String,
                        nullable=True)
    category_id = db.Column(db.Integer,
                        db.ForeignKey('categories.category_id'),
                        nullable=True) # TODO change back to false after testing
    img_id = db.Column(db.Integer,
                        db.ForeignKey('companyimages.image_id'),
                        nullable=True) # TODO change back to false after testing
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    date_added = db.Column(db.DateTime,nullable=False,)
    date_modified = db.Column(db.DateTime,nullable=False,)

    def __repr__(self):
        return (f'<Company company_id={self.company_id} title={self.title} img_id={self.img_id} description={self.description}'
                f'url={self.url} category_id ={self.category_id }date_added={self.date_added} date_modified={self.date_modified}>')

def connect_to_db(flask_app, db_uri='postgresql:///moralauthority', echo=True):
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
    print("Connected to DB.")