from django.contrib import admin
from .models import *
# Register your models here.
class stockAdminSite(admin.ModelAdmin):
    model = Stocks
admin.site.register(Stocks, stockAdminSite)