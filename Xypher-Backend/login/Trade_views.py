from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TradeSerializer
from .models import Trade
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def add_trade(request):
    serializer = TradeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_trade(request):
    trade = Trade.objects.all()
    serializer = TradeSerializer(trade, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_specific_trade(request, trade_id):
    trade = get_object_or_404(Trade, trade_id=trade_id)
    serializer = TradeSerializer(trade)
    return Response(serializer.data, status=status.HTTP_200_OK)

   