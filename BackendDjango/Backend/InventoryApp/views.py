from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from InventoryApp.models import Brand
from InventoryApp.serializers import BrandSerializer

# Create your views here.


@csrf_exempt
def brandApi(request, id=0):
    if request.method == 'GET':
        brands = Brand.objects.all()
        brand_serializer = BrandSerializer(brands, many=True)
        return JsonResponse(brand_serializer.data, safe=False)
    elif request.method == 'POST':
        brand_data = JSONParser().parse(request)
        brand_serializer = BrandSerializer(data=brand_data)
        if brand_serializer.is_valid():
            brand_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)
    elif request.method=='PUT':
        brand_data=JSONParser().parse(request)
        brands=Brand.objects.get(BrandId=brand_data['BrandId'])
        brands_serializer=BrandSerializer(brands,data=brand_data)
        if brands_serializer.is_valid():
            brands_serializer.save()
            return JsonResponse("Updated Successfully ", safe=False)
        return JsonResponse("Failed to update",safe=False)

    elif request.method=='DELETE':
        brand=Brand.objects.get(BrandId=id)
        brand.delete()
        return JsonResponse("Deleted Successfully",safe=False)