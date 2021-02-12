from rest_framework import serializers
from InventoryApp.models import Category
from InventoryApp.models import Brand

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=('CategoryId',
                'CategoryName')



class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields=('BrandId',
                'BrandName')