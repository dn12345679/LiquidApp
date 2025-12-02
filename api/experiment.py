import yfinance as yf 
import pandas as pd



validate_table = pd.read_csv("LiquidApp/api/nasdaqlisted.txt", delimiter="|")

#print("Victory" in validate_table.iloc[23]["Security Name"])

#print(validate_table["Company" in validate_table['Security Name']])

df = validate_table[validate_table["Symbol"].str.contains("AAP", na=False)]
sorted_which_contains = (
    df.assign(_len = df["Symbol"].str.len())
      .sort_values(by="_len", ascending=False)
      .drop(columns="_len")
)
print(len(sorted_which_contains))
print(sorted_which_contains.iloc[0])

print(sorted_which_contains.head())

def test():
    
    df = validate_table[validate_table["Symbol"].str.contains("AAP", na=False)]
    df_sorted_contains = (
        df.assign(_len = df["Symbol"].str.len())
        .sort_values(by="_len", ascending=False)
        .drop(columns="_len")
    )

    return (df_sorted_contains.head() if len(df_sorted_contains) > 0 else False)