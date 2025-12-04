import time 
from flask import request, jsonify, Flask, current_app
from flask_cors import CORS

import json
import numpy as np
import pandas as pd
import analysis # custom script

import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

model = 'Simple'
csv_path = "../api/nasdaqlisted.txt"
validate_table = pd.read_csv(csv_path, delimiter="|")
# d

# for validating input



if __name__ == '__main__':
    app.run(debug=True, port=5000)


@app.route('/api/run')
def run_model():
    ticker = request.args.get("ticker")
    return jsonify(analysis.test(ticker))

@app.route('/api/validate')
def validate_ticker():
    '''
    Given any input ticker, returns true if the ticker 
        is valid, or if it can be translated automatically (ie: "BOEING" = "NYSE: BA" = "BA").
    Otherwise, returns false
    '''
    ticker = request.args.get("ticker")

    if not ticker:
        return jsonify({"valid": False, "error": "No ticker provided"}), 400
    print("hello")
    result = []
    result = autocomplete(ticker)
    
    if result.empty:  # check if DataFrame is empty
        
        return jsonify({"valid": False}), 200
    
    matches = result.fillna('').to_dict('records')

    return jsonify({
        "valid": True, 
        "matches": matches
    }), 200

def autocomplete(ticker):
    '''
    Given any string from the parameter 'ticker'
        Returns a list of up to the first 5 stocks that contain that Symbol.
        If there are no stocks that satisfy, then return an empty DataFrame
    :ticker: String representing a ticker or Symbol of a given stock.
    '''

    df = validate_table[validate_table["Symbol"].str.contains(ticker, na=False, case=False)]
    df_sorted_contains = (
        df.assign(_len=df["Symbol"].str.len())
        .sort_values(by="_len", ascending=True)
        .drop(columns="_len")
    )
    return df_sorted_contains.head()

## methods


def get_model():
    '''
    Simply returns the name of the model being used. 
        Options are:
            'none' - Nothing 
            'simple' - all of 'none' and 5 day price report (plot and table), description, title card  
            'standard' - all of 'simple' and sentiment analysis, value at risk, earnings/financials
            'advanced' - all of 'standard' and forecasting, correlation matrices, anomaly classification
    '''
    return model

@app.route('/api/titlecard')
def get_title_card(ticker):
    '''
    Given a valid input string ticker, returns a JSON containing
        information that will be displayed on a React title card
    '''
    return # Company name, date fetched, price, todays change

@app.route('/api/description')
def get_description(ticker):
    '''
    Given a valid input string ticker, returns a JSON containing
        information to be displayed on a React description card
    '''
    return # some company description
