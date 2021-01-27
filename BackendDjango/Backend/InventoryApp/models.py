from django.db import models


# Create your models here.
class Brand(models.Model):
    BrandId = models.AutoField(primary_key=True)
    BrandName = models.CharField(max_length=100)
