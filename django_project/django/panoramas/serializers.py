from rest_framework import serializers
from .models import *


class PanoramasListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanoramaSeriaContent
        fields = ['id', 'counter_view', 'time_add']

class SeriasListSerializer(serializers.ModelSerializer):
    panoramas = PanoramasListSerializer(many=True)
    class Meta:
        model = PanoramaSeria
        fields = ['id', 'title', 'counter_view', 'time_add', 'description', 'panoramas']