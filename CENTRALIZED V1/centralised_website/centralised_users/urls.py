from django.urls import path
from .views import RegisterView, CustomTokenObtainView, user_details
from rest_framework_simplejwt.views import TokenRefreshView
from .views import validate_token

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', user_details, name='user_details'),
    path('validate/', validate_token, name='validate_token'),
]