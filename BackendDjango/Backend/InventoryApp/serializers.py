from rest_framework import serializers
from InventoryApp.models import Brand

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields=('BrandId',
                'BrandName')