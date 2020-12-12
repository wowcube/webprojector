# webprojector
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Projector application examples

## Requirements
- Python 3 with Pip
- numpy with OpenCV (image processing)
- Flask (web server for Web Projector)
- watchdog (file change notify for FS Projector)

Use [requirements.txt]() to install pip requirements 
```shell script
pip install -r requirements.txt
```

Optional:
- [PyTurboJpeg](https://pypi.org/project/PyTurboJPEG/)
- [flask-latency](https://github.com/philfreo/flask-latency)

## Libraries
- [wowcube](wowcube) used to parse json from WOWCube

## Examples
See [web_projector_basics.py](examples/web_projector_basics.py) for Web Projector example

See [fs_projector_basics.py](examples/fs_projector_basics.py) for Filesystem Projector example

## License
[MIT License](LICENSE)

Author:
- Ivan Stepanov <ivanstepanovftw@gmail.com> <ivan.stepanov@wowcube.com>
