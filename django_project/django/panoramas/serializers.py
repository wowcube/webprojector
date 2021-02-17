from rest_framework import serializers
from .models import *


class PanoramaContentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanoramaSeriaContent
        fields = ['id', 'counter_view', 'time_add']
        read_only_fields = ['counter_view']


class PanoramaContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanoramaSeriaContent
        fields = ['id', 'counter_view', 'time_add']
        read_only_fields = ['counter_view']

    #user = serializers.HiddenField(default=serializers.CurrentUserDefault())


class SeriaListSerializer(serializers.ModelSerializer):
    panoramas = PanoramaContentListSerializer(many=True)
    class Meta:
        model = PanoramaSeria
        fields = ['id', 'title', 'counter_view', 'time_add', 'description', 'panoramas']
        read_only_fields = ['counter_view']


class SeriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanoramaSeria
        fields = ['id', 'title', 'counter_view', 'time_add', 'description', 'user']
        read_only_fields = ['counter_view']

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())