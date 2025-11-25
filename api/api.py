import time 
from flask import request, jsonify, Flask

import json
import analysis # custom script



app = Flask(__name__)

model = 'none'

if __name__ == '__main__':
    app.run(debug=True, port=5000)


@app.route('/api/run')
def run_model():
    ticker = request.args.get("ticker")
    return jsonify(analysis.test(ticker))

@app.route('/api/validate')
def validate_ticker(ticker):
    '''
    Given any input ticker, returns true if the ticker 
        is valid, or if it can be translated automatically (ie: "BOEING" = "NYSE: BA" = "BA").
    Otherwise, returns false
    '''
    return

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