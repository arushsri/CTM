from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, CustomTokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

User = get_user_model()
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """Overrides default create method to return JWT token."""
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=request.data["username"])
        
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "token": str(refresh.access_token),
            "user": {
                "name": user.get_full_name(),
                "roll_number": user.roll_number
            }
        })

class CustomTokenObtainView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_details(request):
    return Response({
        "name": request.user.get_full_name(),
        "roll_number": request.user.roll_number
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def validate_token(request):
    """Validates the JWT token and returns user details."""
    print("🔍 Received request in validate_token API!")  # ✅ Debugging
    print("🔍 Headers:", request.headers)  # ✅ Check headers
    print("🔍 Authenticated user:", request.user)  # ✅ Verify if user is recognized

    user = request.user  

    # ✅ Ensure user is not deleted
    try:
        user = User.objects.get(id=user.id)  
    except User.DoesNotExist:
        print("❌ User does not exist!")  
        return Response({"error": "User no longer exists"}, status=401)  
    
    user = User.objects.get(id=user.id)  # ✅ Ensure fresh DB fetch

    print(f"🔍 User Found: {user.id}, Name: {user.first_name} {user.last_name}, Roll: {user.roll_number}")  

    return Response({
        "name": f"{user.first_name} {user.last_name}",  
        "roll_number": user.roll_number
    })