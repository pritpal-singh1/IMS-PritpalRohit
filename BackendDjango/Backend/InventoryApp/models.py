from django.db import models


# Create your models here.
class Category(models.Model):
    CategoryId = models.AutoField(primary_key=True)
    CategoryName = models.CharField(max_length=100)
