from django.urls import path
from .views import *

urlpatterns = [
    path('get/', serias_panoram_tmp),
    path('seria/location/get/<int:seria_id>/', serias_panoram),
    path('seria/location/add/<int:seria_id>/', post_panorama_seria_content_by_location),
    path('serias/list/', GetPanoramaSeriasList.as_view())
]