
import pandas as pd 
import numpy as np

import nltk 
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from transformers import pipeline

# web scraping
import yfinance as yf 
from bs4 import BeautifulSoup 
import bs4 

import requests 




## VARIABLES





## methods

def test(param):
    dat = yf.Ticker("AAPL")
    return dat.info

def get_price(ticker): 
    '''
    Return price rounded to 2 decimal places.
    Assumes that 'ticker' is valid. (Should be)
    
    :param ticker: String stock ticker
    '''
    
    dat = yf.Ticker(ticker)
    hist = dat.history() 
    last_quote = hist['Close'].iloc[-1]

    return last_quote.round(2)

def get_change(ticker):
    '''
    Given a ticker, returns a list of 2 items:
        - change in price (float)
        - change in percentage (float)
    Assumes that 'ticker' is valid. (Should be)
    :param ticker: String stock ticker
    '''
    
    dat = yf.Ticker(ticker) 
    hist = dat.history() 
    yesterday_price = hist['Close'].tail().iloc[-2]
    last_quote = hist['Close'].iloc[-1]
    
    change_int = last_quote - yesterday_price
    change_pct = (change_int / yesterday_price) * 100
    
    return [(change_int).round(2), (change_pct).round(2)]

def get_5day_history(ticker):
    '''
    Given a ticker, returns a data frame containing the last 5 days of price history.
    Assumes that 'ticker' is valid. (Should be)
    
    :param ticker: String stock ticker
    '''
    
    dat = yf.Ticker(ticker) 
    hist = dat.history(period="5d") 
    
    five_day_hist = [] 
    
    for i in range(5):
        day_data = {
            'Date': str(hist.index[i].month) + "/" + str(hist.index[i].day),
            'Weekday': str(hist.index[i].strftime("%A")[0:3]),
            'Open': str(round(hist['Open'].iloc[i], 2)),
            'Close': str(round(hist['Close'].iloc[i], 2)),
            'High': str(round(hist['High'].iloc[i], 2)),
            'Low': str(round(hist['Low'].iloc[i], 2)),
            'Volume': str(int(hist['Volume'].iloc[i]))
        }
        five_day_hist.append(day_data)  

    
    return five_day_hist


def analysis_nltk(df):
    '''
    Given a 'sentiment data frame' df with the following columns:
        [data, url, ID, ticker]
    
    Returns a dictionary containing:
        {ID: {'label', 'score'}}
    
    Using the VADER nltk
    '''
    nltk.download('vader_lexicon')

def analysis_transformers(df):
    '''
    Given a 'sentiment data frame' df with the following columns:
        [data, url, ID, ticker]

    Returns a dictionary containing:
        {ID: {'label', 'score'}}
        
    Using the transformers pipeline
    '''
    classifier = pipeline("sentiment-analysis") # transformers pipeline model
    
    
    res = {}
    for i, row in df.iterrows():
        try:
            text = row['data']
            id = row['ID']
            
            # 1 line thats it
            analysis = classifier(text) # returns {'label': 'string', 'score': float}
            
            res[id] = {analysis['label'], analysis['score']}
            
        except RuntimeError as e:
            # skip it; 
            continue

    return


def get_sentiment_df(ticker, n):
    ''' 
    Given an integer 'n', and a valid stock ticker "ticker", 
        scrapes the first maximum n articles from Yahoo finance for ticker and returns a Pandas data frame 
        in the format: 
    Data frame contains the following information:
        - data: Sentence component
        - url: Article url 
        - ID: The number in sequential order within the same article
        - ticker: Stock ticker 
        
    DOES NOT perform any analysis
    '''
    news = yf.Search(ticker, news_count = n).news 

    
    sentence_id = 0 # assign to sentences within articles 
    data_to_be_df = []
    for i in range(n): 
        url = news[i]["link"]
        return_url, responses = scrape_article(url) 
        # each article stores a sentence fragment individually 
        for sentence in responses: 
            row_data = { 'data': sentence, 
                    'url': url, 
                    'ID': sentence_id, 
                    'ticker': ticker, 
                    'article_num': i 
                }
            data_to_be_df.append(row_data) 

            sentence_id = sentence_id + 1 
        sentence_id = 0 # reset per article
    df = pd.DataFrame.from_dict(data_to_be_df, orient='columns' )  
    return df


def scrape_article(url):
    '''
    Given a valid 'url' in string format, 
    
    returns 
        a Tuple<String, List<String>> containing 
        the associated 'url' and the list of 'text' 
        scraped from the article. 
    '''
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0"} # validate header
    
    response = requests.get(url, headers = headers)  
    soup = BeautifulSoup(response.text, "html.parser") 
    # html = soup.prettify()
    
    texts = []  # list of all data to analyze; to be returned
    
    # BUGREF: check that class_ doesn't cause issues down the line. 
    for c in soup.find_all('p', class_="yf-1090901"):
        text = c.contents[1]
        # filter out plain html 
        if isinstance(text, bs4.element.NavigableString):
            texts.extend(text.split('. '))

    #save_html(response.text) 
    
    return (url, texts)  
