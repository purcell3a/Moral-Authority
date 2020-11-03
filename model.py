# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# class Card(db.Model):
#     """Card in trading cards website."""

#     __tablename__ = "cards"

#     card_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
#     name = db.Column(db.String(64), nullable=False)
#     skill = db.Column(db.String(64), nullable=True)
#     image_url = db.Column(db.String(250), nullable=True)
    

#     def __repr__(self):
#         """Provide helpful representation when printed."""

#         return f"<Card card_id={self.card_id} name={self.name}>"


# def connect_to_db(app):
#     """Connect the database to our Flask app."""

#     # Configure to use our PostgreSQL database
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cards'
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#     db.app = app
#     db.init_app(app)


# if __name__ == "__main__":
#     # As a convenience, if we run this module interactively, it will leave
#     # you in a state of being able to work with the database directly.

#     from server import app
#     connect_to_db(app)
#     print("Connected to DB.")
def test(this):
    print('why u no show up')