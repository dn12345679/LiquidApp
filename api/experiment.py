import yfinance as yf 
import pandas as pd


dat = yf.Ticker("AAPL")
print(dat.info['currentPrice'])