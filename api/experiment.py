import yfinance as yf 
import pandas as pd
from datetime import datetime 
import time
import analysis




ticker = "CA"

stock = yf.Ticker(ticker)
info = stock.quarterly_financials

print(info)