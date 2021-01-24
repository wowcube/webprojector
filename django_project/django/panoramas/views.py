# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse
import random
import json
from .libs import *
from .models import *

# Create your views here.

def serias_panoram(request):
    # seria_file_list = open("/home/wowcube/www/wowcube.xxiweb.ru/panorams/serias/"+seria+".list", "r")
    # content_seria_list = seria_file_list.readlines()
    # img_io = get_panoram(content_seria_list[random.randint(0, len(content_seria_list)-1)])

    img_io = get_panoram_by_location('-21.6659168,114.3309932')
    return HttpResponse(img_io, content_type="image/bmp")


def post_panorama_seria_content_by_location(request, seria_id):
    res = {}
    res['status'] = False
    res['error'] = ''
    if not request.user.is_authenticated:
        res['error'] = 'Unauthorized'
        return JsonResponse(res, status=401, safe=True)

    if request.method == 'POST':
        try:
            req_json = json.loads(request.body)
            ###########
            ## Реализовать кеширование панорам по локациям
            ###########
            PanoramaSeriaContent.objects.create(
                user = request.user
            )
            res['status'] = True
            return JsonResponse(res, status=201, safe=True)
        except BaseException:
            res['error'] = 'Bad Request'
            return JsonResponse(res, status=400, safe=True)
    else:
        res['error'] = 'Method Not Allowed'
        return JsonResponse(res, status=405, safe=True)

