from django.urls import path
from .views import *

urlpatterns = [
    path("login/", authenticate_and_save_user, name="authenticate_and_save_user"),
    path("save-preferences/", save_preferences, name="save_preferences"),
    path("get-preferences/", get_preferences, name="get_preferences"),
]