import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
# from flask_sqlalchemy import SQLAlchemy

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///db/airbnbdb.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Passenger = Base.classes.passenger
Grouped_roomtype = Base.classes.grouped_roomtype
Grouped_neighborhoods = Base.classes.grouped_neighborhoods
Legal = Base.classes.legal
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/roomtype<br/>"
        f"/api/v1.0/neighborhoods<br/>"
        f"/api/v1.0/mapping<br/>"
        f"/api/v1.0/legal_illegal<br/>"
        f"/api/v1.0/passengers"
    )


# @app.route("/")
# def index():
#     """Return the homepage."""
#     return render_template("index.html")



@app.route("/api/v1.0/roomtype")
def roomtype():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of data for"""
    # Query all passengers
    results = session.query(Grouped_roomtype.roomtype, Grouped_roomtype.count, Grouped_roomtype.percentage).all()

    session.close()

     # Create a list dictionaries from the row data and append to a list of all_roomtypes
    all_roomtypes = []
    for roomtype, count, percentage in results:
        roomtype_dict = {}
        roomtype_dict["roomtype"] = roomtype
        roomtype_dict["count"] = count
        roomtype_dict["percentage"] = percentage
        all_roomtypes.append(roomtype_dict)



    print(roomtype_dict)
    return jsonify(roomtype_dict)


# @app.route("/api/v1.0/neighborhoods")
# def roomtype():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of data for"""
#     # Query all passengers
#     results = session.query(Grouped_roomtype.roomtype, Grouped_roomtype.count, Grouped_roomtype.percentage).all()

#     session.close()

#      # Create a dictionary from the row data and append to a list of all_roomtypes
#     all_roomtypes = []
#     for roomtype, count, percentage in results:
#         roomtype_dict = {}
#         roomtype_dict["roomtype"] = roomtype
#         roomtype_dict["count"] = count
#         roomtype_dict["percentage"] = percentage
#         all_roomtypes.append(roomtype_dict)

#     return jsonify(all_roomtypes)




#------------------Titanic data for reference ----------------------


















@app.route("/api/v1.0/mapping")
def mapping():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of data for"""
    # Query all passengers
    results = session.query(Passenger.name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)
    

@app.route("/api/v1.0/legal_illegal")
def legal_illegal():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of data for"""
    # legal and illegal listings
    results = session.query(Legal.legal_illegal, Legal.count, Legal.percentage).all()

    session.close()

     # Create a dictionary from the row data and append to a list of all_legal_illegal
 
    for legal_illegal, count, percentage in results:
        legal_illegal_dict = {}
        legal_illegal_dict["legal_illegal"] = legal_illegal
        legal_illegal_dict["count"] = count
        legal_illegal_dict["percentage"] = percentage

    return jsonify(legal_illegal_dict)

# @app.route("/api/v1.0/neighborhoods")
# def neighborhoods():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
