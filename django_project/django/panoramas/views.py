# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
import random
import os
import json
from .libs import *
from .models import *
from .serializers import *


def check_seria_owner(user, seria_id):
    try:
        if len(PanoramaSeria.objects.filter(user=user, id=seria_id)) > 0:
            return False
        else:
            return True
    except BaseException as e:
        print(e)
        return False

@api_view(['GET'])
def serias_panoram_tmp(request):
    # seria_file_list = open("/home/wowcube/www/wowcube.xxiweb.ru/panorams/serias/"+seria+".list", "r")
    # content_seria_list = seria_file_list.readlines()
    # img_io = get_panoram(content_seria_list[random.randint(0, len(content_seria_list)-1)])

    img_io = get_panoram_by_location('-21.6659168,114.3309932')
    return HttpResponse(img_io, content_type="image/bmp")


@api_view(['GET'])
def serias_panoram(request, seria_id):
    res = {}
    res['status'] = False
    try:
        seria = PanoramaSeria.objects.get(id=seria_id)
        pano = PanoramaSeriaContent.objects.filter(panorama_seria=seria).order_by('?').first()
        pano_path = settings.PANORAMAS_PATH + str(seria_id) + '/' + str(pano.id) + ".bmp"
        print(pano_path)
        with open(pano_path, 'rb') as f:
            img_io = f.read()
        pano.counter_view += 1
        pano.save()
        seria.counter_view += 1
        seria.save()
        return HttpResponse(img_io, content_type="image/bmp")
    except BaseException as e:
        res['error'] = 'Bad Request'
        res['message'] = str(e)
        return JsonResponse(res, status=400, safe=True)

@api_view(['POST'])
def post_panorama_seria_content_by_location(request, seria_id):
    res = {}
    res['status'] = False
    res['error'] = ''

    if not request.user.is_authenticated:
        res['error'] = 'Unauthorized'
        return JsonResponse(res, status=401, safe=True)

    # if check_seria_owner(request.user, seria_id) == False:
    #     res['error'] = 'Unauthorized'
    #     return JsonResponse(res, status=401, safe=True)

    if request.method == 'POST':
        try:
            req_json = json.loads(request.body)
            pano_seria_path = settings.PANORAMAS_PATH + str(seria_id) + '/'
            if len(req_json['location']) > 3:
                print(pano_seria_path)
                if not os.path.exists(pano_seria_path):
                    os.makedirs(pano_seria_path)
                    print('create dir')
                new_pano = PanoramaSeriaContent.objects.create(
                    panorama_seria_id = int(seria_id)
                )
                if save_panoram_to_file(req_json['location'], pano_seria_path+str(new_pano.id)+".bmp"):
                    res['status'] = True
                    return JsonResponse(res, status=201, safe=True)
                else:
                    new_pano.delete()

            res['error'] = 'Bad Request'
            return JsonResponse(res, status=400, safe=True)
        except BaseException as e:
            res['error'] = 'Bad Request'
            res['message'] = str(e)
            return JsonResponse(res, status=400, safe=True)
    else:
        res['error'] = 'Method Not Allowed'
        return JsonResponse(res, status=405, safe=True)


class GetPanoramaSeriasList(generics.ListAPIView):
    queryset = PanoramaSeria.objects.all()
    serializer_class = SeriasListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ['id', 'title', 'counter_view', 'time_add', 'description']
    #filterset_fields = ['title']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'time_add', 'counter_view']

    def get_queryset(self):
        print(self.request.user.id)
        return PanoramaSeria.objects.filter(user_id=self.request.user.id)