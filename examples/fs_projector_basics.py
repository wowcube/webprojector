#!/usr/bin/env python3
"""
Author: Ivan Stepanov <ivanstepanovftw@gmail.com>
"""
import os
import platform
from json import JSONDecodeError
from typing import Optional
import cv2
import ctypes.wintypes
import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler, FileModifiedEvent
from examples.web_projector_basics import draw_cubenet, draw_side, draw_screen
from wowcube.projector import WOWCube

wowcube_path: str
if platform.system() == "Windows":
    CSIDL_PERSONAL = 5       # My Documents
    SHGFP_TYPE_CURRENT = 0   # Get current, not default value
    buf = ctypes.create_unicode_buffer(ctypes.wintypes.MAX_PATH)
    ctypes.windll.shell32.SHGetFolderPathW(None, CSIDL_PERSONAL, None, SHGFP_TYPE_CURRENT, buf)
    documents_dir: str = buf.value
    wowcube_path: str = os.path.join(documents_dir, "WOWCube")
elif platform.system() in ("Linux", "Darwin", "Java"):
    from pathlib import Path
    home = str(Path.home())
    wowcube_path: str = os.path.join(home, "WOWCube")


sides_shape = [(480, 0), (480, 480), (480, 960), (480, 1440), (0, 480), (960, 480)]
sides_dict = {"up": (480, 0), "front": (480, 480), "down": (480, 960), "back": (480, 1440), "left": (0, 480), "right": (960, 480)}
sides_names = ["up", "front", "down", "back", "left", "right"]


def get_cubenet_path() -> str:
    return os.path.join(wowcube_path, "cubenet")


def get_side_path(side: str) -> Optional[str]:
    return os.path.join(wowcube_path, "sides", side) if side in sides_names else None


def get_screen_path(mid: int, sid: int) -> Optional[str]:
    return os.path.join(wowcube_path, "modules", str(mid), "screens", str(sid)) if mid in range(0, 8) and sid in range(0, 3) else None


def create_folders():
    os.makedirs(wowcube_path, exist_ok=True)
    os.makedirs(os.path.join(wowcube_path, "sides"), exist_ok=True)
    for mid in range(0, 8):
        os.makedirs(os.path.join(wowcube_path, "modules", str(mid), "screens"), exist_ok=True)


def test():
    # good
    assert get_cubenet_path() is not None
    assert get_side_path('front') is not None
    assert get_screen_path(mid=0, sid=0) is not None
    assert get_screen_path(mid=0, sid=2) is not None
    assert get_screen_path(mid=7, sid=0) is not None
    # wrong
    assert get_side_path('WRONG') is None
    assert get_screen_path(mid=-1, sid=-1) is None
    assert get_screen_path(mid=0, sid=3) is None
    assert get_screen_path(mid=8, sid=0) is None


def main():
    test()
    create_folders()
    print("wowcube_path: " + wowcube_path)
    print("get_cubenet_path(): " + get_cubenet_path())
    print("get_side_path('front'): " + get_side_path('front'))
    print("get_screen_path(0, 0): " + get_screen_path(0, 0))
    print("get_screen_path(7, 2): " + get_screen_path(7, 2))

    mode = 2  # 0: cubenet, 1: side, 2: screen

    my_event_handler = PatternMatchingEventHandler(patterns="*", ignore_patterns=None, ignore_directories=False, case_sensitive=True)

    def on_modified(event: FileModifiedEvent):
        try:
            if os.path.basename(event.src_path) == "data.json":
                with open(event.src_path) as data_json:
                    wowcube = WOWCube.from_json(data_json.read())

                ext = '.bmp'
                # encode_param = [cv2.IMWRITE_JPEG_QUALITY, 95]
                encode_param = []

                if mode == 0:
                    output_img = draw_cubenet(wowcube)
                    save_path = get_cubenet_path() + ext
                    cv2.imwrite(save_path, output_img, encode_param)
                    print(f"saved cubenet to {save_path}")
                elif mode == 1:
                    for side in sides_names:
                        output_img = draw_side(side, wowcube)
                        if output_img is not None:
                            save_path = get_side_path(side) + ext
                            cv2.imwrite(save_path, output_img, encode_param)
                            print(f"saved {side} to {save_path}")
                            # time.sleep(0.5)
                elif mode == 2:
                    for mid in range(0, 8):
                        for sid in range(0, 3):
                            output_img = draw_screen(mid, sid, wowcube)
                            if output_img is not None:
                                save_path = get_screen_path(mid, sid) + ext
                                cv2.imwrite(save_path, output_img, encode_param)
                                print(f"saved {mid},{sid} to {save_path}")
        except JSONDecodeError:
            pass

    # my_event_handler.on_created = on_created
    # my_event_handler.on_deleted = on_deleted
    my_event_handler.on_modified = on_modified
    # my_event_handler.on_moved = on_moved

    my_observer = Observer()
    my_observer.schedule(my_event_handler, path=wowcube_path, recursive=True)

    my_observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        my_observer.stop()
        my_observer.join()


if __name__ == '__main__':
    main()
