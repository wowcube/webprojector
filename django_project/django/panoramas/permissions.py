from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        try:
            return obj.user == request.user
        except BaseException:
            pass
        try:
            return obj.panorama_seria.user == request.user
        except BaseException:
            pass
        return False