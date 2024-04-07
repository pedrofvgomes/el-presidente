import pandas as pd
from api import *
from datetime import datetime
import time
import os
import csv

def data_to_csv():
    # Get the current time
    now = datetime.now()
    max_size = 100
    
    # Fetch market data for BTC; assuming this returns a dictionary
    market_data = nft_stats('BTC')

    if market_data is not None:
        market_data['real_price'] = (float(market_data['ask']) + float(market_data['bid'])) / 2
        # Create a DataFrame from the market data dictionary
        df = pd.DataFrame([market_data])

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

        with open(file_path, 'r') as f:
            data = list(csv.reader(f))
            size = len(data)

        if size > max_size:
            # Remove the second row
            data.pop(1)

            # Write the data back to the CSV file
            with open(file_path, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerows(data)

        print(f"Data appended to {file_path}.")
    else:
        print("Failed to fetch market data.")
    


while True:
    data_to_csv()
    time.sleep(3)