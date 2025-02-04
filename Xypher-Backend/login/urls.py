from django.urls import path
from .views import add_user, get_users, login

urlpatterns = [
    path('authenticate/', login, name="login"),
    path('add/', add_user, name='add_user'),
    path('users/', get_users, name='get_users')
]