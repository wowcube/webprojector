from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(PanoramaSeria)
class PanoramaSeriaAdmin(admin.ModelAdmin):
    list_display = ['title', 'time_add', 'user', 'counter_view']

@admin.register(PanoramaSeriaContent)
class PanoramaSeriaContentAdmin(admin.ModelAdmin):
    list_display = ['id', 'panorama_seria', 'time_add', 'counter_view']

