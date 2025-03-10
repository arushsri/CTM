from django.db import models

class AsmpUser(models.Model):
    name = models.CharField(max_length=255)
    roll_number = models.CharField(max_length=20, unique=True)
    preference1 = models.CharField(max_length=255, blank=True, null=True)
    preference2 = models.CharField(max_length=255, blank=True, null=True)
    preference3 = models.CharField(max_length=255, blank=True, null=True)
    preference4 = models.CharField(max_length=255, blank=True, null=True)
    preference5 = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.roll_number})"