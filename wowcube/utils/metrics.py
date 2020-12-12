"""
Author: Ivan Stepanov <ivanstepanovftw@gmail.com>
"""
import time

from wowcube.utils.decorators import fluent


class Timer:
    def __init__(self) -> None:
        super().__init__()
        self._running = False
        self._start = None
        self._end = None

    @fluent
    def start(self):
        """Start a new timer"""
        if self._running:
            raise RuntimeError(f"Timer is already running")
        self._running = True
        self._start = time.perf_counter()

    @fluent
    def reset(self):
        """Start a new timer"""
        self._start = time.perf_counter()
        self._end = self._start

    @fluent
    def stop(self):
        if not self._running:
            raise RuntimeError(f"Timer is not running")
        self._running = False
        self._end = time.perf_counter()

    @fluent
    def resume(self):
        if self._running:
            raise RuntimeError(f"Timer is already running")
        self._running = True
        self._start += time.perf_counter() - self._end

    def running(self) -> bool:
        """Is timer already started"""
        return self._running

    def elapsed(self) -> float:
        if self._running:
            return time.perf_counter() - self._start
        else:
            if self._start is None:
                return 0
            return self._end - self._start

    def __str__(self) -> str:
        return f"{self.elapsed():0.3f}"


class FPS:
    def __init__(self) -> None:
        super().__init__()
        self._running = False
        self._before = 0
        self._frame_time = []

    @fluent
    def start(self):
        now = time.perf_counter()
        self._before = now

    @fluent
    def reset(self):
        self._before = 0
        self._frame_time = []

    @fluent
    def record(self):
        now = time.perf_counter()
        self._frame_time.append(now - self._before)
        self._before = now

    def average(self) -> float:
        return sum(self._frame_time) / len(self._frame_time)

    def last(self) -> float:
        """Last frame time, seconds"""
        return self._frame_time[-1]

    def __str__(self) -> str:
        return f"#{len(self)}: FPS: {1 / self.average():0.3f}, last: {self._frame_time[-1]*100:0.1f} ms"

    def __len__(self):
        """Number of records"""
        return len(self._frame_time)


def _timer_test():
    t = Timer()
    time.sleep(0.1)
    print(f"Elapsed #1: {t} seconds")

    t.start()
    time.sleep(0.1)
    print(f"Elapsed #2: {t} seconds")

    t.reset()
    time.sleep(0.1)
    print(f"Elapsed #3: {t} seconds")

    time.sleep(0.1)
    print(f"Elapsed #4: {t.stop()} seconds")

    time.sleep(0.1)
    print(f"Elapsed #5: {t} seconds")

    time.sleep(0.1)
    print(f"Elapsed #6: {t.reset()} seconds")

    time.sleep(0.1)
    print(f"Elapsed #7: {t.start()} seconds")

    time.sleep(0.1)
    t.stop()
    time.sleep(0.1)
    t.resume()
    time.sleep(0.1)
    print(f"Elapsed #8: {t} seconds")


def _fps_test():
    f = FPS().start()
    for i in range(10):
        time.sleep(0.1)
        f.record()
        print(f"{f}")


if __name__ == '__main__':
    _timer_test()
    _fps_test()
