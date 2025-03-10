from django.contrib import admin
from .models import AsmpUser

class AsmpUserAdmin(admin.ModelAdmin):
    list_display = ("name", "roll_number", "preference1", "preference2", "preference3", "preference4", "preference5")
    search_fields = ("name", "roll_number")

admin.site.register(AsmpUser, AsmpUserAdmin)