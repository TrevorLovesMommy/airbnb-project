import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
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
Mapping = Base.classes.mapping
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/roomtypes<br/>"
#         f"/api/v1.0/neighborhoods<br/>"
#         f"/api/v1.0/mapping<br/>"
#         f"/api/v1.0/legal_illegal<br/>"
#     )


@app.route("/")
def index():
    #return homepage
    return render_template("index.html")


@app.route("/api/v1.0/roomtypes")
def roomtypes():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # query db for roomtype breakdown of SF Airbnb listings
    results = session.query(Grouped_roomtype.room_type, Grouped_roomtype.count, Grouped_roomtype.percentage).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_roomtypes
    all_roomtypes = []
    for roomtype, count, percentage in results:
        roomtype_dict = {}
        roomtype_dict["roomtype"] = roomtype
        roomtype_dict["count"] = count
        roomtype_dict["percentage"] = percentage
        all_roomtypes.append(roomtype_dict)

    print(all_roomtypes)
    return jsonify(all_roomtypes)
    
@app.route("/api/v1.0/neighborhoods")
def neighborhoods():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # query db for roomtype by neighborhood of SF Airbnb listings
    results = session.query(Grouped_neighborhoods.neighbourhood_cleansed, Grouped_neighborhoods.entire_house, Grouped_neighborhoods.shared_room, Grouped_neighborhoods.private_room).all()

    session.close()

    all_neighborhoods = []
    for neighbourhood_cleansed, entire_house, shared_room, private_room in results:
        neighborhoods_dict = {}
        neighborhoods_dict["neighbourhood_cleansed"] = neighbourhood_cleansed
        neighborhoods_dict["entire_house"] = entire_house
        neighborhoods_dict["private_room"] = private_room
        neighborhoods_dict["shared_room"] = shared_room
        all_neighborhoods.append(neighborhoods_dict)

    print(all_neighborhoods)
    return jsonify(all_neighborhoods)

@app.route("/api/v1.0/mapping")
def mapping():
    # Create our session (link) from Python to the DB
    session = Session(engine)
 
    # query db for roomtype by neighborhood of SF Airbnb listings
    results = session.query(Mapping.latitude, Mapping.longitude, Mapping.illegal, Mapping.name, Mapping.minimum_maximum_nights, Mapping.room_type, Mapping.neighbourhood_cleansed).all()

    session.close()

    # Create a dictionary from the row data and append to a list of mapping information
    all_mapping = []
    for latitude, longitude, illegal, name, minimum_maximum_nights, room_type, neighbourhood_cleansed in results:
        mapping_dict = {}
        mapping_dict["latitude"] = latitude
        mapping_dict["longitude"] = longitude
        mapping_dict["legal_status"] = illegal
        mapping_dict["name"] = name
        mapping_dict["minimum_maximum_nights"] = minimum_maximum_nights
        mapping_dict["room_type"] = room_type
        mapping_dict["neighbourhood"] = neighbourhood_cleansed
        all_mapping.append(mapping_dict)

    return jsonify(all_mapping)

@app.route("/api/v1.0/legal_illegal")
def legal_illegal():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # query db for legal vs. illegal entire homes of SF Airbnb listings
    results = session.query(Legal.legal_illegal, Legal.count, Legal.percentage).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_legal_illegal
    all_legal_illegal = []
    for legal_illegal, count, percentage in results:
        legal_illegal_dict = {}
        legal_illegal_dict["legal_illegal"] = legal_illegal
        legal_illegal_dict["count"] = count
        legal_illegal_dict["percentage"] = percentage
        all_legal_illegal.append(legal_illegal_dict)

    print(all_legal_illegal)
    return jsonify(all_legal_illegal)

if __name__ == '__main__':
    app.run(debug=True)
