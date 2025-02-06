from rest_framework import serializers
from .models import User,Trade

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ('username', 'password', 'role')

    def save(self):
        account = User(username=self.validated_data['username'], role=self.validated_data['role'])
        account.set_password(self.validated_data['password'])
        account.save()

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = '__all__'
