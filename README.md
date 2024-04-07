# Brunix

Brunix is an advanced trading bot designed to operate in the cryptocurrency markets, utilizing a combination of technical analysis indicators and sentiment analysis to make informed trading decisions. The bot interfaces with the Uphold API to fetch real-time price data for various cryptocurrencies and executes trades based on predefined trading strategies.

Key Features:

Uphold API Integration:

Brunix seamlessly integrates with the Uphold API to access real-time price data for cryptocurrencies.
The Uphold API provides reliable and up-to-date market information, allowing Brunix to make informed trading decisions.
Technical Analysis:

Brunix incorporates technical analysis indicators such as Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), and Exponential Moving Averages (EMA) to analyze price trends and identify potential trading opportunities.
The bot implements three distinct functions based on risk levels: high risk, medium risk, and low risk, each utilizing different parameter settings for the technical indicators.
Sentiment Analysis:

Brunix utilizes artificial intelligence (AI) algorithms to analyze the sentiment of cryptocurrency-related news articles, social media posts, and other sources of information.
Sentiment analysis helps Brunix gauge market sentiment and incorporate qualitative data into its trading decisions.
Decision Making:

Based on the insights gathered from technical analysis and sentiment analysis, Brunix generates buy or sell signals for specific cryptocurrency pairs.
The bot's decision-making process is driven by predefined trading strategies and risk management principles, aiming to optimize profit potential while mitigating risk exposure.
User Interface (UI):

Brunix features a user-friendly interface built using Electron, Webpack, and React, with a backend built using Django, where the algorithms run on.
The UI provides users with easy access to key features, including real-time price data, trading signals, and configuration options.

# Instructions
On a terminal window, while on the project's root directory run <code>python python/brunix/manage.py makemigrations</code> then <code>python python/brunix/manage.py migrate</code> and finally <code>python python/brunix/manage.py runserver</code>. This starts the backend server.

On another terminal, without closing the previous one, and also on the project's root directory run <code>npm install</code> and <code>npm start</code>.
