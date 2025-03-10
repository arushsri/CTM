from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    roll_number = models.CharField(max_length=10, unique=True)
    hostel_number = models.CharField(max_length=10)

    # to avoid conflict with Django's default auth.User.groups
    groups = models.ManyToManyField(
        "auth.Group", related_name="custom_users_groups", blank=True
    )

    # to avoid conflict with Django's default auth.User.user_permissions
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="custom_users_permissions", blank=True
    )

    def __str__(self):
        return self.username

# Django already has a well-structured User model that provides
# Username & Password Handling. By extending AbstractUser, we get all this functionality without having to reimplement it from scratch.
# AbstractUser includes:
# username
# password (automatically hashed)
# first_name
# last_name
# email
# We only need to add extra fields (roll_number and hostel_number):

# If we directly create a User model, we would lose built-in Django authentication features (like password hashing, permission system) and would have to manually handle password encryption, login logic, and user authentication.