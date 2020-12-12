"""
Author: Ivan Stepanov <ivanstepanovftw@gmail.com>
"""
import cv2
import numpy as np

from wowcube.utils.decorators import fluent


class Image:
    def __init__(self, width, height) -> None:
        super().__init__()
        self.width: int = int(width)
        self.height: int = int(height)
        self.img = np.zeros((height, width, 3), np.uint8)

    @fluent
    def clear(self):
        self.img = np.zeros((self.width, self.height, 3), np.uint8)

    @fluent
    def fill(self, color=(255, 255, 255)):
        color = tuple(map(int, color))[::-1]
        cv2.rectangle(img=self.img,
                      pt1=(0, 0),
                      pt2=(self.width, self.height),
                      color=color,
                      thickness=-1)

    @fluent
    def text(self,
             text,
             pos,
             color=(255, 255, 255),
             font_scale=1,
             thickness=1,
             font_face=cv2.FONT_HERSHEY_SIMPLEX,
             outline_color=(0, 0, 0),
             line_spacing=1.5):
        """
        Draws multiline with an outline.
        TODO: rotation, offset point (e.g. TOP LEFT (default), CENTER, etc.)
        """
        assert isinstance(text, str)

        pos = np.array(pos, dtype=float)
        assert pos.shape == (2,)

        color = tuple(map(int, color))[::-1]
        outline_color = tuple(map(int, outline_color))[::-1]

        for line in text.splitlines():
            (w, h), _ = cv2.getTextSize(
                text=line,
                fontFace=font_face,
                fontScale=font_scale,
                thickness=thickness,
            )
            uv_bottom_left_i = pos + [0, h]
            org = tuple(uv_bottom_left_i.astype(int))

            if outline_color is not None:
                cv2.putText(
                    img=self.img,
                    text=line,
                    org=org,
                    fontFace=font_face,
                    fontScale=font_scale,
                    color=outline_color,
                    thickness=thickness * 3,
                    lineType=cv2.LINE_AA,
                )
            cv2.putText(
                img=self.img,
                text=line,
                org=org,
                fontFace=font_face,
                fontScale=font_scale,
                color=color,
                thickness=thickness,
                lineType=cv2.LINE_AA,
            )

            pos += [0, h * line_spacing]

    @fluent
    def line(self,
             pt1,
             pt2,
             color=(0, 0, 0),
             thickness=1):
        pt1 = tuple(map(int, pt1))
        pt2 = tuple(map(int, pt2))
        color = tuple(map(int, color))[::-1]
        cv2.line(img=self.img, pt1=pt1, pt2=pt2, color=color, thickness=thickness)

    @fluent
    def circle(self,
               center,
               radius,
               color=(0, 0, 0),
               thickness=1):
        center = tuple(map(int, center))
        radius = int(radius)
        color = tuple(map(int, color))[::-1]
        cv2.circle(img=self.img, center=center, radius=radius, color=color, thickness=thickness)
