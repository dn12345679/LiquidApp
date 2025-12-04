import yfinance as yf 
import pandas as pd
from datetime import datetime 
import time



date = datetime.now()

data = yf.Ticker("AAPL")
hist = data.history(period="5d")
five_day_hist = [] 

for i in range(5):
    
    day_data = {
        'Date': str(hist.index[i].month + 1) + "/" + str(hist.index[i].day),
        'Weekday': str(hist.index[i].strftime("%A")[0:3]),
        'Open': str(round(hist['Open'].iloc[i], 2)),
        'Close': str(round(hist['Close'].iloc[i], 2)),
        'High': str(round(hist['High'].iloc[i], 2)),
        'Low': str(round(hist['Low'].iloc[i], 2)),
        'Volume': str(int(hist['Volume'].iloc[i]))
    }
    five_day_hist.append(day_data)  


print(five_day_hist)


