from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from InventoryApp.models import Category
from InventoryApp.serializers import CategorySerializer
from InventoryApp.models import Brand
from InventoryApp.serializers import BrandSerializer

# Create your views here.

@csrf_exempt
def categoryApi(request, id=0):
    if request.method=='GET':
        categories= Category.objects.all()
        category_serializer=CategorySerializer(categories,many=True)
        return JsonResponse(category_serializer.data,safe=False)
    elif request.method=='POST':
        category_data= JSONParser().parse(request)
        category_serializer=CategorySerializer(data=category_data)
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse("Added",safe=False)
        return JsonResponse("failed to add",safe=False)
    elif request.method=='PUT':
        category_data= JSONParser().parse(request)
        category=Category.objects.get(CategoryId=category_data['CategoryId'])
        category_serializer=CategorySerializer(category,data=category_data)
        if category_serializer.is_valid():
            category_serializer.save()
            return JsonResponse("Updated",safe=False)
        return JsonResponse("failed to Update",safe=False)

    elif request.method=='DELETE':
        category=Category.objects.get(CategoryId=id)
        category.delete()
        return JsonResponse("deleted",safe=False)

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
            return JsonResponse("Added",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method == 'PUT':
        brand_data = JSONParser().parse(request)
        brand = Brand.objects.get(BrandId=brand_data['BrandId'])
        brand_serializer = BrandSerializer(brand,data=brand_data)
        if brand_serializer.is_valid():
            brand_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        brand = Brand.objects.get(BrandId = id)
        brand.delete()
        return JsonResponse("Deleted",safe=False)
