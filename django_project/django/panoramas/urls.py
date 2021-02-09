from django.urls import path
from .views import *

urlpatterns = [
    path('get/', serias_panoram_tmp),
    path('panorama/get/<int:seria_id>/', get_panorama),

    path('panorama/list/<int:seria_id>/', PanoramaContentList.as_view()),
    path('panorama/location/add/<int:seria_id>/', post_panorama_seria_content_by_location),
    path('panorama/files/add/<int:seria_id>/', post_panorama_seria_content_by_files),

    path('panorama/rud/<int:pk>/', PanoramaContentRUD.as_view()),
    path('serias/add/', SeriaCreate.as_view()),
    path('serias/rud/<int:pk>/', SeriaRUD.as_view()),
    path('serias/list/', SeriaList.as_view()),

]