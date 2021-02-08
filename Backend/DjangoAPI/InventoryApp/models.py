from django.db import models


# Create your models here.
class Category(models.Model):
    CategoryId = models.AutoField(primary_key=True)
    CategoryName = models.CharField(max_length=100)


class Brand(models.Model):
    BrandId = models.AutoField(primary_key=True)
    BrandName = models.CharField(max_length=100)
    def __str__(self):
        return self.BrandName
