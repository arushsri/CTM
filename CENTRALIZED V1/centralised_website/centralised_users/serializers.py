from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'roll_number', 'hostel_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        user = User.objects.filter(username=username).first()
        if not user:
            raise serializers.ValidationError({"error": "User does not exist"}, code=404)

        # Now check if the password is correct
        authenticated_user = authenticate(username=username, password=password)
        if not authenticated_user:
            raise serializers.ValidationError({"error": "Incorrect password"}, code=401)

        # Call parent validate method (JWT token generation)
        data = super().validate(attrs)

        # Add extra user details in response
        data['name'] = f"{self.user.first_name} {self.user.last_name}"
        data['roll_number'] = self.user.roll_number
        
        return data