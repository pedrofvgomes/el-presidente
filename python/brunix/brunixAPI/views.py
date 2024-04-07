from datetime import datetime
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
import sys
sys.path.insert(1, 'python/brunix/main.py')
from main import *
import Indicators

class BrunixViewSet(viewsets.ViewSet):
# Create your views here.
    # Create your views here.
    @action(methods=['GET'],  detail=False, name='Get Value from input' )
    def get_val_from( self, request ):

        input = request.GET[ 'input' ]
        
        return Response( status=status.HTTP_200_OK,
                data=f"[{ datetime.now() }] input= { input }, value from Django" )
        
    @action(methods=['GET'],  detail=False, name='Start session' )
    def start_session( self, request ):

        print(request)

        iid = int(request.GET['id'])
        risk = float(int(request.GET['risk'])/100)
        rsi_per = int(request.GET['rsi'])
        ema_fast_per = int(request.GET['ema_fast'])
        ema_slow_per = int(request.GET['ema_slow'])

        print(iid, risk,rsi_per, ema_fast_per, ema_slow_per)

        main(iid, risk,rsi_per,ema_fast_per,ema_slow_per)

        return Response( status=status.HTTP_200_OK,
                data=f"[{ datetime.now() }] Session started" )
        
    
    @action(methods=['GET'],  detail=False, name='Get Transactions' )
    def get_transactions( self, request ):
        tmp = Indicators.transaction_list
        Indicators.transaction_list = []
        return Response( status=status.HTTP_200_OK,
                data=tmp)
        