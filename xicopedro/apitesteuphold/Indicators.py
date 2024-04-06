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

def delete_processed_lines(file_path, lines_to_delete=10):
    """Deletes the first N lines of the CSV file after they have been processed."""
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Keep the header and the lines after the first N
    with open(file_path, 'w') as file:
        file.writelines(lines[:1] + lines[lines_to_delete + 1:])

global open_position, entry_price, last_action
global current_money, current_btc, entry_value, risk, stop_loss

open_position = None
entry_price = None
last_action = None
current_money = 10000  # Example starting money
current_btc = 0  # Example starting BTC amount
entry_value = 0
risk = 0.01  # Example risk level
stop_loss = 0.1  # Example stop loss level

def weighted_signal_decision_with_close_and_performance(df):
    global open_position, entry_price, last_action
    global current_money, current_btc, entry_value, risk, stop_loss
    
    df_high = high_risk_scalping_strategy(df.copy()).rename(columns={'Signal': 'Signal_High'})
    df_medium = medium_risk_scalping_strategy(df.copy()).rename(columns={'Signal': 'Signal_Medium'})
    df_low = low_risk_scalping_strategy(df.copy()).rename(columns={'Signal': 'Signal_Low'})
    
    # Assume df_high, df_medium, df_low are generated here...
    combined_df = df_high[['Signal_High', 'real_price']].join([df_medium[['Signal_Medium']], df_low[['Signal_Low']]])

    # Iterate over each set of 10 inputs
    for start in range(0, len(combined_df), 10):
        subset = combined_df.iloc[start:start+10]
        if len(subset) < 10:
            continue  # Skip if less than 10
        
        weighted_signal = (subset['Signal_High'].sum() * 0.2 + 
                           subset['Signal_Medium'].sum() * 0.3 +
                           subset['Signal_Low'].sum() * 0.5) / 10
        last_price = subset['real_price'].iloc[-1]
        
        if weighted_signal > 0:
            if open_position != 'Buy':
                # Potential buy signal
                if open_position == 'Sell':
                    # Close sell before buying
                    sell_amount = current_btc
                    current_money += sell_amount * last_price
                    current_btc = 0
                    print_close_position(start, 'Sell', entry_price, last_price)
                # Check if we're not repeating the same action
                if last_action != 'open_buy':
                    buy_amount = (current_money * risk) / last_price
                    current_btc += buy_amount
                    current_money -= buy_amount * last_price
                    print_open_position(start, 'Buy', last_price)
                    open_position, entry_price, last_action = 'Buy', last_price, 'open_buy'
                
        elif weighted_signal < 0:
            if open_position != 'Sell':
                # Potential sell signal
                if open_position == 'Buy':
                    # Close buy before selling
                    buy_amount = current_btc
                    current_money += buy_amount * last_price
                    current_btc = 0
                    print_close_position(start, 'Buy', entry_price, last_price)
                # Check if we're not repeating the same action
                if last_action != 'open_sell':
                    sell_amount = (current_money / last_price) * risk
                    current_money += sell_amount * last_price
                    current_btc -= sell_amount
                    print_open_position(start, 'Sell', last_price)
                    open_position, entry_price, last_action = 'Sell', last_price, 'open_sell'
                
        elif abs(weighted_signal) < 0.1 and open_position:
            # Close existing position due to weak signal
            if last_action not in ['close_buy', 'close_sell']:
                performance = (last_price - entry_price) if open_position == 'Buy' else (entry_price - last_price)
                print_close_position(start, open_position, entry_price, last_price)
                open_position, entry_price, last_action = None, None, f"close_{open_position.lower()}"
    delete_processed_lines(file_path)
# Helper functions remain unchanged

        # Additional logic to handle closing positions on weak signals...
        
#def calculate_weighted_signal(df):
    # Placeholder for your real weighted signal calculation
 #   return df['Signal'].mean()  # Simplified example

def process_data():
    while True:
        df = pd.read_csv(file_path)
        
        if len(df) < 11:  # Ensure there's more than just the header
            continue  # Wait for more data

        # Process the first 10 lines of data
        subset = df.iloc[1:11]  # Skip header, process next 10
        weighted_signal_decision_with_close_and_performance(subset)

        # Function to delete the first 10 lines of actual data (after header)
        delete_processed_lines(file_path, 10)

        # Here you can add a delay or a condition to exit the loop

def print_open_position(index, position, price):
    print(f"Opening {position} position at index {index+9} with price {price:.2f}")

def print_close_position(index, position, entry, last):
    performance = (last - entry) if position == 'Buy' else (entry - last)
    print(f"Closing {position} position at index {index+9}. Performance: {performance:.2f}")


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
