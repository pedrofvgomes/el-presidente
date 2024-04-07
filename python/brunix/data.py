import pandas as pd
from api import *
from datetime import datetime
import time
import os

def data_to_csv():
    # Get the current time
    now = datetime.now()
    
    # Fetch market data for BTC; assuming this returns a dictionary
    market_data = nft_stats('BTC')

    if market_data is not None:
        market_data['real_price'] = (float(market_data['ask']) + float(market_data['bid'])) / 2
        # Create a DataFrame from the market data dictionary
        df = pd.DataFrame([market_data])
    
    file_path = 'python/brunix/csv/market_data.csv'

    # Check if the file exists to determine if the header should be written
    if os.path.exists(file_path):
        # Append data without header
        df.to_csv(file_path, mode='a', header=False, index=False)
        # Insert the DateTime column at the first position
        df.insert(0, 'DateTime', now)
        
        file_path = './csv/market_data.csv'
    
        # Check if the file exists to determine if the header should be written
        if os.path.exists(file_path):
            # Append data without header
            df.to_csv(file_path, mode='a', header=False, index=False)
        else:
            # Write new file with header
            df.to_csv(file_path, mode='w', header=True, index=False)
    
        print(f"Data appended to {file_path}.")
    else:
        print("Failed to fetch market data.")
    


while True:
    data_to_csv()
    time.sleep(3)