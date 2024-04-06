from lumibot.brokers import Alpaca
from alpaca_trade_api import REST
from datetime import datetime, timedelta
from utils import estimate_sentiment
import matplotlib.pyplot as plt
from collections import defaultdict

API_KEY = "PKWM3RCBC65TU4IGTE6S"
API_SECRET = "iXNR6HciuopLcKoVT7UH5Hk9Q5zOnxSaukZFvqgv"
BASE_URL = "https://paper-api.alpaca.markets/v2"

ALPACA_CREDS = {
    "API_KEY": API_KEY,
    "API_SECRET": API_SECRET,
    "PAPER": True
}

class News():
    def __init__(self):
        self.symbol = "BTCUSD"
        self.api = REST(base_url=BASE_URL, key_id=API_KEY, secret_key=API_SECRET)

    def get_dates(self, days=3):
        today = datetime.now()
        three_days_ago = today - timedelta(days=days)
        return today.strftime("%Y-%m-%d"), three_days_ago.strftime("%Y-%m-%d")

    def get_sentiment(self, days=3): 
        today, days_prior = self.get_dates(days=days)
        news = self.api.get_news(symbol=self.symbol, start=days_prior, end=today, limit=1000) 
        dates = [ev.__dict__["_raw"]["created_at"] for ev in news]
        news = [ev.__dict__["_raw"]["headline"] for ev in news]
        probability, sentiment, sentiment_list = estimate_sentiment(news)
        sentiment_data = list(zip(dates, sentiment_list))
        sorted_sentiment_data = sorted(sentiment_data, key=lambda x: x[0])
        sorted_dates = [data[0] for data in sorted_sentiment_data][1:]
        sorted_sentiments = [data[1] for data in sorted_sentiment_data][1:]
        return probability, sentiment, sorted_sentiments, sorted_dates

    def collect_sentiment_data(self, days=3):
        sentiment_data = []
        _, _, sentiments, dates = self.get_sentiment(days=days)
        for date, sent in zip(dates, sentiments):
            sentiment_data.append((date, sent))
        return sentiment_data

    def plot_sentiment_analysis(self, sentiment_data):
        dates = [datetime.strptime(data[0][:10], '%Y-%m-%d') for data in sentiment_data]
        sentiments = [1 if data[1] == "positive" else -1 if data[1] == "negative" else 0 for data in sentiment_data]
        sentiments_by_date = defaultdict(list)
        for date, sentiment in zip(dates, sentiments):
            sentiments_by_date[date.date()].append(sentiment)
        mean_sentiments = {}
        for date, sent_list in sentiments_by_date.items():
            mean_sentiments[date] = sum(sent_list) / len(sent_list)
        
        plt.figure(figsize=(10, 6))
        mean_dates = list(mean_sentiments.keys())
        mean_sentiment_values = list(mean_sentiments.values())
        plt.plot(mean_dates, mean_sentiment_values, marker='', linestyle='-', color='blue', label='Mean Sentiment')
        for date, sentiment_value in zip(mean_dates, mean_sentiment_values):
            color = 'red' if sentiment_value < 0 else 'green'
            plt.scatter(date, sentiment_value, color=color, zorder=2)
        plt.axhline(y=0, color='gray', linestyle='--')
        plt.title('Sentiment Analysis of BTCUSD News')
        plt.xlabel('Date')
        plt.ylabel('Sentiment')
        plt.yticks([-1, 0, 1], ['Really Negative', 'Neutral', 'Really Positive'])
        plt.ylim(-1, 1)
        plt.gca().xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%d-%m'))
        plt.xticks(rotation=45)
        plt.legend()
        plt.grid(False)
        plt.tight_layout()
        plt.savefig('sentiment_analysis.png')
        plt.show()
        print(mean_sentiments)

news = News()
sentiment_data = news.collect_sentiment_data(days=20)
news.plot_sentiment_analysis(sentiment_data)
