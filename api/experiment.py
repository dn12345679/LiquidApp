import yfinance as yf 
import pandas as pd
from datetime import datetime 
import time
import analysis




ticker = "MSF"

df = analysis.get_sentiment_df(ticker, 5)
sent = analysis.analysis_vaders(df)


print(df.head())
print(sent)