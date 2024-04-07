import requests


def nft_stats(currency):
    url = f"https://api.uphold.com/v0/ticker/{currency}"

    headers = {"accept": "application/json"}
    

    try:
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return None

        data = response.json()

        def check(elem):
            if elem.get('pair') == 'BTCUSD':
                return True
            else:
                return False
        return list(filter(check, data))[0]
    
    except Exception as e:
        return None

print(nft_stats('BTC'))