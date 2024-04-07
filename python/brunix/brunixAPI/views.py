from datetime import datetime
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from .news import News

class BrunixViewSet(viewsets.ViewSet):
# Create your views here.
    # Create your views here.
    @action(methods=['GET'],  detail=False, name='Get Value from input' )
    def get_val_from( self, request ):
  
        input = request.GET[ 'input' ]
        
        return Response( status=status.HTTP_200_OK,
                data=f"[{ datetime.now() }] input= { input }, value from Django" )
    
    @action(methods=['GET'], detail=False, name='Get News Data')
    def news_data(self, request):
        news = News()
        _, _, sentiment_data = news.get_sentiment(days=20)
        return Response(sentiment_data, status=status.HTTP_200_OK)