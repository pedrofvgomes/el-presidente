import pandas as pd
import talib
import numpy as np

# Simulated loading your CSV data into a DataFrame
file_path = 'market_data.csv'  # Make sure the file path is correct
df = pd.read_csv(file_path)
from io import StringIO

# Create DataFrame from the data string

# Convert 'real_price' column to a numpy array
real_prices = df['real_price'].values

# Calculate indicators
sma = talib.SMA(real_prices, timeperiod=5)
ema = talib.EMA(real_prices, timeperiod=5)
rsi = talib.RSI(real_prices, timeperiod=7)

# Example output
print("SMA:", sma)
print("EMA:", ema)
print("RSI:", rsi)
