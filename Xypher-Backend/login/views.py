from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer
from .models import User
from django.contrib.auth import authenticate, login

@api_view(['POST'])
def add_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(status=status.HTTP_200_OK, headers={'Access-Control-Allow-Origin': '*'})

@api_view(['GET'])
def get_users(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK, headers={'Access-Control-Allow-Origin': '*'})

@api_view(['POST'])
def login(request):
    user = authenticate(request, username=request.data['username'], password=request.data['password'])
    if user is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user = User.objects.get(username=user)
    user_data = {
        "username": user.username,
        "role": user.role
    }
    return Response(user_data, status=status.HTTP_200_OK,headers={'Access-Control-Allow-Origin': '*'})


