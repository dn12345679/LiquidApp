import yfinance as yf 
import pandas as pd
from datetime import datetime 
import time
import analysis

try:
    import torch
    _TORCH_AVAILABLE = True
except Exception:
    torch = None  # type: ignore
    _TORCH_AVAILABLE = False


date = datetime.now()



anal = analysis.get_sentiment_df("MSFT", 5)

df = analysis.analysis_transformers(anal)

print(anal)
print(df)


