from django.urls import path
from .views import *

urlpatterns = [
    path('get/', serias_panoram),
    path('seria/location/add/<int:seria_id>/', post_panorama_seria_content_by_location)
]