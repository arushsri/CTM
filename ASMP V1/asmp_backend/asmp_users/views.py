import requests
from django.http import JsonResponse
from .models import AsmpUser
from django.views.decorators.csrf import csrf_exempt
import json

CENTRALIZED_BACKEND_URL = "http://127.0.0.1:8000/api/auth/login/"  # Centralized Login API

@csrf_exempt
def authenticate_and_save_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Missing username or password"}, status=400)

            # Send login request to centralized backend
            response = requests.post(CENTRALIZED_BACKEND_URL, json={"username": username, "password": password})
            response_data = response.json()  # Get JSON response

            if response.status_code == 200:
                user_data = response.json()
                name = user_data.get("name")
                roll_number = user_data.get("roll_number")

                user, created = AsmpUser.objects.get_or_create(roll_number=roll_number, defaults={"name": name})

                return JsonResponse({
                    "message": "User authenticated and saved",
                    "user": {"name": user.name, "roll_number": user.roll_number}
                }, status=200)

            elif response.status_code == 401:
                return JsonResponse({"error": "Incorrect password"}, status=401)
            
            elif response.status_code == 404:
                return JsonResponse({"error": "No such user exists. Please register on the centralized website."}, status=404)
            
            else:
                return JsonResponse({"error": response_data.get("error", "Authentication failed")}, status=response.status_code)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def save_preferences(request):
    """Saves or updates user preferences in ASMP database."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            roll_number = data.get("roll_number")
            name = data.get("name")  # Name is required
            preferences = data.get("preferences", [])

            if not roll_number or not name:
                return JsonResponse({"error": "Invalid data"}, status=400)

            # ✅ Create or update user
            user, created = AsmpUser.objects.get_or_create(
                roll_number=roll_number,
                defaults={"name": name}
            )

            # ✅ Update preferences
            user.preference1, user.preference2, user.preference3, user.preference4, user.preference5 = preferences
            user.save()

            return JsonResponse({"message": "Preferences saved successfully!"})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)
    
@csrf_exempt
def get_preferences(request):
    """Fetch user preferences if they exist."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            roll_number = data.get("roll_number")

            if not roll_number:
                return JsonResponse({"error": "Roll number is required"}, status=400)

            user = AsmpUser.objects.filter(roll_number=roll_number).first()
            if not user:
                return JsonResponse({"exists": False})  # User not found

            return JsonResponse({
                "exists": True,
                "preferences": [
                    user.preference1,
                    user.preference2,
                    user.preference3,
                    user.preference4,
                    user.preference5,
                ]
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)