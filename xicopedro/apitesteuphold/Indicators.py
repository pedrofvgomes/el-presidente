import pandas as pd
import talib
import numpy as np
from io import StringIO

# Simulated loading your CSV data into a DataFrame
file_path = 'market_data.csv'  # Make sure the file path is correct
df = pd.read_csv(file_path)


# Create DataFrame from the data string

# Convert 'real_price' column to a numpy array
#df = df1['real_price'].values
entry_value = 1000
current_money = entry_value
current_btc = 0
risk = 0.01
stop_loss = 50


def weighted_signal_decision_with_close_and_performance(df):
    """
    Decides when to open (buy/sell) and close positions based on weighted signals from different strategies.
    Additionally, prints the trade performance when a position is closed.
    """
    # Generate signal columns with the strategies
    df_high = high_risk_scalping_strategy(df.copy()).rename(columns={'Signal': 'Signal_High'})
    df_medium = medium_risk_scalping_strategy(df.copy()).rename(columns={'Signal': 'Signal_Medium'})
    df_low = low_risk_scalping_strategy(df.copy()).rename(columns={'Signal': 'Signal_Low'})
    
    combined_df = df_high[['Signal_High', 'real_price']].join([df_medium['Signal_Medium'], df_low['Signal_Low']])
    
    open_position = None  # Track the state of the position (None, 'Buy', 'Sell')
    entry_price = None  # Track the entry price for calculating performance
    
    # Evaluate every set of 10 inputs
    for start in range(0, len(combined_df), 10):
        global current_money
        global current_btc
        global entry_value
        global risk
        global stop_loss
        subset = combined_df.iloc[start:start+10]
        if len(subset) < 10:
            break  # Ignore the last set if it has fewer than 10 entries
        
        weighted_signal = (subset['Signal_High'].sum() * 0.2 + 
                           subset['Signal_Medium'].sum() * 0.3 +
                           subset['Signal_Low'].sum() * 0.5) / 10
        
        last_price = subset['real_price'].iloc[-1]  # Last price in the subset
        
        # Detect buy/sell opportunity
        if weighted_signal > 0 and open_position != 'Buy':
            print(f"Buy opportunity detected at index {start+9}. Consider opening or flipping a position.")
            
            buy = (current_money * risk*(abs(stop_loss-(entry_value - current_money))))/(last_price*100)
            print("Bought:" , buy*last_price)
            current_btc += buy
            current_money -= buy * last_price
            entry_price = last_price  # Set entry price for performance calculation
            
        elif weighted_signal < 0 and open_position != 'Sell':
            print(f"Sell opportunity detected at index {start+9}. Consider opening or flipping a position.")
            open_position = 'Sell'
            
            buy = (current_money * risk*(abs(stop_loss-(entry_value - current_money))))/(last_price*100)
            print("Sold:" , buy*last_price)
            if buy > current_btc:
                buy = current_btc
            current_money -= buy
            current_money += buy * last_price
            entry_price = last_price  # Set entry price for performance calculation
            
        # Advice on closing positions: looking for a weak signal as an indicator to close
        if abs(weighted_signal) < 0.1 and open_position:  # Threshold for closing can be adjusted
            # Calculate performance
            performance = ((last_price - entry_price))
            if open_position == "Sell":
                performance = -performance
            
            print(f"Close {open_position} position detected at index {start+9}. Start Price: {entry_price:.2f}, Last Price: {last_price:.2f}, Performance: {performance:.2f}$")
            open_position = None  # Reset the open position status
            entry_price = None  # Reset entry price




def high_risk_scalping_strategy(df):
    # Fast MACD for momentum, using real_price
    df['MACD'], df['MACD_signal'], _ = talib.MACD(df['real_price'], fastperiod=6, slowperiod=13, signalperiod=5)
    # RSI to avoid overbought situations, using real_price
    df['RSI'] = talib.RSI(df['real_price'], timeperiod=7)
    
    # Entry signal: MACD above signal and RSI not overbought
    df['Signal'] = np.where((df['MACD'] > df['MACD_signal']) & (df['RSI'] < 70), 1,
                            np.where((df['MACD'] < df['MACD_signal']) | (df['RSI'] > 70), -1, 0))
    return df


def medium_risk_scalping_strategy(df):
    # Short and medium EMAs to identify trend, using real_price
    df['EMA_fast'] = talib.EMA(df['real_price'], timeperiod=5)
    df['EMA_slow'] = talib.EMA(df['real_price'], timeperiod=10)
    
    # Entry signal: EMA_fast crosses above EMA_slow
    df['Signal'] = np.where((df['EMA_fast'] > df['EMA_slow']), 1,
                            np.where((df['EMA_fast'] < df['EMA_slow']), -1, 0))
    return df


def low_risk_scalping_strategy(df):
    # RSI for market condition, using real_price
    df['RSI'] = talib.RSI(df['real_price'], timeperiod=14)
    
    # Entry signals based on RSI staying in a safer range
    df['Signal'] = np.where(df['RSI'] > 40, np.where(df['RSI'] < 60, 1, -1), 0)
    return df

weighted_signal_decision_with_close_and_performance(df)
print("Total Profit:", current_money - current_money)

#print(high_risk_scalping_strategy(df))
#print(medium_risk_scalping_strategy(df))
#print(low_risk_scalping_strategy(df))
# Calculate indicators
#sma = talib.SMA(real_prices, timeperiod=5)
#ema = talib.EMA(real_prices, timeperiod=5)
#rsi = talib.RSI(real_prices, timeperiod=7)

# Example output
#print("SMA:", sma)
#print("EMA:", ema)
#print("RSI:", rsi)
