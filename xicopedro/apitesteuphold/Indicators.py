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


global open_position, entry_price, last_action, last_price

open_position = None  # Initialize outside the function to maintain state across function calls
entry_price = None
last_action = None  # Track the last action ('open_buy', 'open_sell', 'close_buy', 'close_sell', None)


def weighted_signal_decision_with_close_and_performance(df):
    global open_position, entry_price, last_action
    global current_money
    global current_btc
    global entry_value
    global risk
    global stop_loss
    global last_price
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
        
        subset = combined_df.iloc[start:start+10]
        if len(subset) < 10:
            print("Less than 10 entries remaining. Exiting loop..")
            break  # Ignore sets with fewer than 10 entries
        
        weighted_signal = (subset['Signal_High'].sum() * 0.2 + 
                           subset['Signal_Medium'].sum() * 0.3 +
                           subset['Signal_Low'].sum() * 0.5) / 10
        last_price = subset['real_price'].iloc[-1]
        
        # Check for new buy/sell opportunities or to close existing positions
        if weighted_signal > 0 and open_position != 'Buy':
            if open_position == 'Sell':  # Close sell before opening buy
                performance = entry_price - last_price
                print_close_message(start, 'Sell', entry_price, last_price, performance)
                
                open_position, entry_price = 'Buy', last_price
                last_action = 'open_buy'
            elif last_action != 'open_buy':  # Open buy if no open position
                print_open_message(start, 'Buy', last_price)
                open_position, entry_price, last_action = 'Buy', last_price, 'open_buy'
            buy = (current_money * risk*(abs(stop_loss-(entry_value - current_money))))/(last_price*100)
            
            if buy * last_price > current_money:
                buy = current_money
            print("Bought:" , buy*last_price)
            
            current_btc += buy
            current_money -= buy * last_price
            print("Current BTC:", current_btc, " (",current_btc * last_price,")")
            print("Current Money:", current_money)
            entry_price = last_price
                
        elif weighted_signal < 0 and open_position != 'Sell':
            if open_position == 'Buy':  # Close buy before opening sell
                performance = last_price - entry_price
                print_close_message(start, 'Buy', entry_price, last_price, performance)
                open_position, entry_price = 'Sell', last_price
                last_action = 'open_sell'
            elif last_action != 'open_sell':  # Open sell if no open position
                print_open_message(start, 'Sell', last_price)
                open_position, entry_price, last_action = 'Sell', last_price, 'open_sell'
            buy = (current_money * risk*(abs(stop_loss-(entry_value - current_money))))/(last_price*100)
            if buy > current_btc:
                buy = current_btc
            print("Sold:" , buy*last_price)
            
            current_btc -= buy
            current_money += buy * last_price
            print("Current BTC:", current_btc, " (",current_btc * last_price,")")
            print("Current Money:", current_money)
                
        elif abs(weighted_signal) < 0.1 and open_position and last_action not in ['close_buy', 'close_sell']:
            # Close existing position due to weak signal
            performance = (last_price - entry_price) if open_position == 'Buy' else (entry_price - last_price)
            print_close_message(start, open_position, entry_price, last_price, performance)
            open_position, entry_price, last_action = None, None, f"close_{open_position.lower()}"

def print_open_message(index, position, price):
    print(f"{position} opportunity detected at index {index+9}. Opening {position} at Price: {price:.2f}")

def print_close_message(index, position, entry, last, performance):
    print(f"Closing {position} position detected at index {index+9}. Start Price: {entry:.2f}, Last Price: {last:.2f}, Performance: {performance:.2f}$")



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
print("Total Profit:", (current_money + (current_btc * last_price)) - current_money)

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
