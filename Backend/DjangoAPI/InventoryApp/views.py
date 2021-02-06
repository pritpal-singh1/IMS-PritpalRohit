from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from InventoryApp.models import Category
from InventoryApp.serializers import CategorySerializer

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