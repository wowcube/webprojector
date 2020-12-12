import functools


def fluent(func):
    """Function returns self"""
    @functools.wraps(func)
    def wrapped(*args, **kwargs):
        # Assume it's a method.
        self = args[0]
        func(*args, **kwargs)
        return self
    return wrapped
