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


def save_panoram_to_file(location, file_path, thumb_file_path):
    try:
        img_io = get_panoram_by_location(location)
        thumb_io = thumb_generate(img_io)
        with open(thumb_file_path, "wb") as f:
            f.write(thumb_io.getbuffer())

        # print("img_io")
        with open(file_path, "wb") as f:
            f.write(img_io.getbuffer())
        return True
    except BaseException:
        return False

def crop_box_240(base_image, left, top):
    return base_image.crop( (left, top, left+240, top+240) )


def convert_to_panoram(img_io):
    base_image = Image.open(img_io)
    base_image = base_image.resize((2320, 1740))

    width, height = base_image.size
    w = 480 * 4
    h = 480 * 3

    rect_original = width/4
    display_rect_original = rect_original/2
    croppx = 25

    img = Image.new('RGBA', (w, h), (0,0,0,0))
    print(width, height)
    j = 0
    while j < 6:
        top = display_rect_original * j
        top_past = 240 * j
        i = 0
        while i < 8:
            img.paste(crop_box_240(base_image, croppx+290*i, top+croppx), (240*i,top_past))
            i += 1
        j += 1

    # left_side = 350
    # watermark = Image.open('panorams/space/watermark.png')
    # img.paste(watermark, (left_side,460+480), mask=watermark)
    # img.paste(watermark, (left_side+480,460+480), mask=watermark)
    # img.paste(watermark, (left_side+480*2,460+480), mask=watermark)
    # img.paste(watermark, (left_side+480*3,460+480), mask=watermark)
    # img.paste(watermark, (left_side+480,460), mask=watermark)
    # img.paste(watermark, (left_side+480,460+480*2), mask=watermark)

    # img.show()
    img_io = BytesIO()
    img.save(img_io, format="BMP")
    img_io.seek(0)
    return img_io


def thumb_generate(img_io):
    thumb_panorama = Image.open(img_io)
    thumb_panorama = thumb_panorama.resize((640, 480))
    thumb_panorama = thumb_panorama.crop((0, 160, 640, 320))
    thumb_panorama = thumb_panorama.convert('RGB')
    img_io = BytesIO()
    thumb_panorama.save(img_io, format="JPEG")
    img_io.seek(0)
    return img_io


def get_thumb(panorama_id=0, seria_id=0):
    pano_path = settings.PANORAMAS_PATH + str(seria_id) + '/' + str(panorama_id) + "_thumb.jpg"
    print(pano_path)
    with open(pano_path, 'rb') as f:
        img_io = f.read()
    return img_io
