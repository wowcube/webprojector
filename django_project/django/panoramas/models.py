from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class PanoramaSeria(models.Model):
    class Meta:
        db_table = 'panoramas_serias'
        verbose_name = 'Seria'
        verbose_name_plural = 'Serias'

    user = models.ForeignKey(User, blank=False, null=False, verbose_name='Owner', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=False, null=False, verbose_name='Seria title')
    time_add = models.DateTimeField(auto_now_add=True, blank=False, null=False, verbose_name='Add time')
    counter_view = models.IntegerField(default=0, verbose_name='Views')
    description = models.TextField(default='', verbose_name='Description')

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title


class PanoramaSeriaContent(models.Model):
    class Meta:
        db_table = 'panoramas_serias_contents'
        verbose_name = 'Seria content'
        verbose_name_plural = 'Seria contents'

    panorama_seria = models.ForeignKey(PanoramaSeria, related_name='panoramas', blank=False, null=False, verbose_name='Owner', on_delete=models.CASCADE)
    time_add = models.DateTimeField(auto_now_add=True, blank=False, null=False, verbose_name='Add time')
    counter_view = models.IntegerField(default=0, verbose_name='Views')
