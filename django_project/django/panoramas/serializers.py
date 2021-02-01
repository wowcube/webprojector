from rest_framework import serializers
from .models import *


class PanoramaContentsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanoramaSeriaContent
        fields = ['id', 'counter_view', 'time_add']

class SeriasListSerializer(serializers.ModelSerializer):
    panoramas = PanoramaContentsListSerializer(many=True)
    class Meta:
        model = PanoramaSeria
        fields = ['id', 'title', 'counter_view', 'time_add', 'description', 'panoramas']

class PanoramaContentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanoramaSeriaContent
        fields = '__all__'

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())