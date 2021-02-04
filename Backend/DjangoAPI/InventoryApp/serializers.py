from rest_framework import serializers
from InventoryApp.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=('CategoryId',
                'CategoryName')