# -*- coding: utf-8 -*-
from io import BytesIO
import requests
from PIL import Image
from django.conf import settings

def get_panoram_frame(location, heading, pitch):
    base_url = 'https://maps.googleapis.com/maps/api/streetview?size=480x480'
    key = settings.GOOGLE_STREETVIEW_KEY
    fov = 90
    im_url = base_url + '&heading=' + str(heading) + '&pitch=' + str(pitch) + '&location=' + location + '&fov=' + str(
        fov) + '&key=' + key
    response = requests.get(im_url)
    return Image.open(BytesIO(response.content))


def get_panoram_by_location(location):
    heading = '0'  # горизонтальный угол
    pitch = '0'  # вертикальный угол

    img = Image.new(mode = "RGB", size = (1920, 1440))

    imgs = []
    imgs.append(get_panoram_frame(location, 0, 90))

    img.paste(get_panoram_frame(location, 0, 90), (480, 0))
    img.paste(get_panoram_frame(location, -90, 0), (0, 480))
    img.paste(get_panoram_frame(location, 0, 0), (480, 480))
    img.paste(get_panoram_frame(location, 90, 0), (960, 480))
    img.paste(get_panoram_frame(location, 180, 0), (1440, 480))
    img.paste(get_panoram_frame(location, 0, -90), (480, 960))

    img_io = BytesIO()
    img.save(img_io, format="BMP")
    img_io.seek(0)
    return img_io


def save_panoram_to_file(location, file_path):
    try:
        img_io = get_panoram_by_location(location)
        print("img_io")
        with open(file_path, "wb") as f:
            f.write(img_io.getbuffer())
        return True
    except BaseException:
        return False