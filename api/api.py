import time 
from flask import request, jsonify, Flask, current_app
from flask_cors import CORS

import json
import numpy as np
import pandas as pd
import analysis # custom script

from datetime import datetime 

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

    if not ticker or ticker == "":
        return jsonify({"valid": False, "matches": [], "error": "No ticker provided"}), 400
    
    # check exact
    exact_match = validate_table[validate_table['Symbol'].str.upper() == ticker.upper()]
    if not exact_match.empty:
        
        result = autocomplete(ticker)
        matches = result.fillna('').to_dict('records')
        return jsonify({
            "valid": False, 
            "matches": matches
        }), 200
    result = autocomplete(ticker)
    if result.empty:
        return jsonify({"valid": False, "matches": []}), 200
    
    matches = result.fillna('').to_dict('records')
    return jsonify({
        "valid": False, 
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

@app.route('/api/legal')
def isLegal(): 
    '''
    Given a string parameter ticker,
        Return true if it is a legal ticker, and 
        false if it is not. Searches full dataframe for exact match (case-insensitive)
    '''
    ticker = request.args.get("ticker")
    
    # check exact match
    isValid = (validate_table['Symbol'].str.upper() == ticker.upper()).any()
    return jsonify({"valid": bool(isValid)}), 200

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
def get_title_card():
    '''
    Given a valid input string ticker, returns a JSON containing
        information that will be displayed on a React title card
    '''
    ticker = request.args.get("ticker")
    df = validate_table[validate_table["Symbol"] == ticker]
    
    company_name = df.iloc[0]["Security Name"].split("-")[0] # return
    
    date = datetime.now()
    month = date.strftime("%B") # month name
    year = date.year
    day = date.day
    date = f"{month} {day}, {year}" # return
    
    price = analysis.get_price(ticker) # return 
    
    change = analysis.get_change(ticker) # return 
    
    tm = datetime.now().time()
    timestamp = (str(tm.hour) + ":" + str(tm.minute).zfill(2) + " " + ("AM" if tm.hour < 12 else "PM")) # return

    return jsonify({"Name": str(company_name), "Date": str(date), "Price": str(price), "ChangeInt": str(change[0]), "ChangePct": str(change[1]),  "Time": str(timestamp)}), 200 # Company name, date fetched, price, todays change


@app.route('/api/fivedayreport')
def get_5_day_report():
    '''
    Given a valid input string ticker, returns a JSON containing
        information to be displayed on a 5-day price report card
    Output is a list of 5 dictionaries, each containing:
        - date: string MM-DD
        - open: float
        - close: float
        - high: float
        - low: float
        - volume: int
        - weekday: string 3-letter abbreviation
    :param ticker: String stock ticker
    '''
    ticker = request.args.get("ticker")
    arr_5day = analysis.get_5day_history(ticker)
    
    return jsonify(arr_5day), 200  

@app.route('/api/description')
def get_description(ticker):
    '''
    Given a valid input string ticker, returns a JSON containing
        information to be displayed on a React description card
    '''
    return # some company description



@app.route('/api/sentiment')
def get_sentiment():
    '''
    Given a valid input string ticker, returns a JSON containing
        information to be displayed on a sentiment analysis card
    Output is a list of dictionaries, each containing:
        - ID: The number in sequential order within the same article
        - ticker: Stock ticker 
        - title: Title of the article
        - link: Link to the article
        - published_utc: Date/time published (UTC)
        - sentiment_label: Sentiment label (POSITIVE, NEGATIVE, NEUTRAL)
        - sentiment_score: Sentiment score (float between 0 and 1)
    :param ticker: String stock ticker
    '''
    ticker = request.args.get("ticker")
    df = analysis.get_sentiment_df(ticker, 5)
    sent = analysis.analysis_vaders(df)
    
    sent_2list = [v for k, v in sorted(sent.items(), key = lambda kv: int(kv[0]))]
    
    return jsonify(sent_2list), 200


@app.route('/api/financials')
def get_financials():
    ticker = request.args.get("ticker")
    df = analysis.get_financials(ticker)
    return jsonify(df)
    
