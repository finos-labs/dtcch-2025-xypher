"""
URL configuration for home project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from login.views import *
from login.Trade_views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('login/', include('login.urls'))
    path('authenticate/', login, name="login"),
    path('add_user/', add_user, name='add_user'),
    path('get_user/', get_users, name='get_users'),

    path('add_trade/', add_trade, name='add_trade'),
    path('get_trade/', get_trade, name='get_trade'),
    path('get_trade_id/<str:trade_id>', get_specific_trade, name='get_specific_trade')
]
