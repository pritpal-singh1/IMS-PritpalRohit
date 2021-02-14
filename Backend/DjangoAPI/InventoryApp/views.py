from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from InventoryApp.models import Category, Brand, Role, AdminUser, Product, CustomersOnline, SalesOrderOnline, Supplier, Employee
from InventoryApp.serializers import CategorySerializer, BrandSerializer, RoleSerializer, AdminSerializer, ProductSerializer, CustomersOnlineSerializer, SalesOrderOnlineSerializer, SupplierSerializer, EmployeeSerializer



from django.core.files.storage import default_storage

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
def brandApi(request, bid=0):
    if request.method == 'GET':
        brands = Brand.objects.all()
        print(brands)
        brand_serializer = BrandSerializer(brands, many=True)
        return JsonResponse(brand_serializer.data, safe=False)
    elif request.method == 'POST':
        brand_data = JSONParser().parse(request)
        print(type(brand_data))
        brand_serializer = BrandSerializer(data=brand_data)
        print(brand_serializer)
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
        brand = Brand.objects.get(BrandId = bid)
        brand.delete()
        return JsonResponse("Deleted",safe=False)

@csrf_exempt
def SaveProductImage(request):
    file=request.FILES['uploadedFile']
    file_name=default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)

@csrf_exempt
def newSalesOrder(request):
    sales_order=JSONParser().parse(request)
    sales_order_serializer = SalesOrdersOfflineSerializer(data=sales_order)
    print(sales_order_serializer)
    sales_order_serializer.is_valid(raise_exception=True)
    if sales_order_serializer.is_valid():
        sales_order_serializer.save()
        print(sales_order_serializer.data)
        print("This is Id: ",sales_order_serializer.data['SalesOrderOfflineId'])
        return JsonResponse("Added", safe=False)
    return JsonResponse("Failed to add", safe=False)

@csrf_exempt
def supplierApi(request, sid=0):
    if request.method == 'GET':
        suppliers = Supplier.objects.all()
        suppliers_serializer = SupplierSerializer(suppliers, many=True)
        return JsonResponse(suppliers_serializer.data, safe=False)
    elif request.method == 'POST':
        supplier_data = JSONParser().parse(request)
        print(supplier_data)
        supplier_serializer = SupplierSerializer(data=supplier_data)
        print(supplier_serializer)
        supplier_serializer.is_valid(raise_exception=True)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return JsonResponse("Added",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method == 'PUT':
        supplier_data = JSONParser().parse(request)
        supplier = Supplier.objects.get(SupplierId=supplier_data['SupplierId'])
        supplier_serializer = SupplierSerializer(supplier,data=supplier_data)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        supplier = Supplier.objects.get(SupplierId = sid)
        supplier.delete()
        return JsonResponse("Deleted",safe=False)

@csrf_exempt
def employeeApi(request,eid=0):
    if request.method == 'GET':
        employee = Employee.objects.all()
        employee_serializer = EmployeeSerializer(employee, many=True)
        print(employee_serializer.data)
        return JsonResponse(employee_serializer.data, safe=False)
    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        print(employee_data)
        employee_serializer = EmployeeSerializer(data=employee_data)
        print(employee_serializer)
        employee_serializer.is_valid(raise_exception=True)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Added", safe=False)
        return JsonResponse("Failed to add", safe=False)
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee = Employee.objects.get(EmployeeId=employee_data['EmployeeId'])
        employee_serializer = EmployeeSerializer(employee, data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("updated", safe=False)
        return JsonResponse("failed to update", safe=False)
    elif request.method == 'DELETE':
        employee = Employee.objects.get(EmployeeId=eid)
        employee.delete()
        return JsonResponse("Deleted", safe=False)
# @csrf_exempt
# def roleApi(request):
#     if request.method == 'GET':
#         roles = Role.objects.all()
#         role_serializer = RoleSerializer(roles, many=True)
#         return JsonResponse(role_serializer.data, safe=False)
#     elif request.method == 'POST':
#         role_data = JSONParser().parse(request)
#         role_serializer = RoleSerializer(data = role_data)
#         if role_serializer.is_valid():

@csrf_exempt
def adminApi(request, aid=0):
    if request.method == 'GET':
        admins = AdminUser.objects.all()
        print(admins)
        admin_serializer = AdminSerializer(admins, many=True)
        return JsonResponse(admin_serializer.data, safe=False)
    elif request.method == 'POST':
        admin_data = JSONParser().parse(request)
        admin_serializer = AdminSerializer(data=admin_data)
        print(admin_serializer)
        if admin_serializer.is_valid():
            admin_serializer.save()
            return JsonResponse("Added",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method == 'PUT':
        admin_data = JSONParser().parse(request)
        admin = AdminUser.objects.get(adminId=admin_data['AdminUserid'])
        admin_serializer = AdminSerializer(admin,data=admin_data)
        if admin_serializer.is_valid():
            admin_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        admin = AdminUser.objects.get(adminId = aid)
        admin.delete()
        return JsonResponse("Deleted",safe=False)


@csrf_exempt
def productApi(request, pid=0):
    if request.method == 'GET':
        products = Product.objects.all()
        print(products)
        product_serializer = ProductSerializer(products, many=True)
        return JsonResponse(product_serializer.data, safe=False)
    elif request.method == 'POST':
        product_data = JSONParser().parse(request)
        product_serializer = ProductSerializer(data=product_data)
        print(product_serializer.is_valid(Exception))
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse("Added",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method == 'PUT':
        product_data = JSONParser().parse(request)
        product = Product.objects.get(productId=product_data['ProductId'])
        product_serializer = ProductSerializer(product,data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        product = Product.objects.get(productId = pid)
        product.delete()
        return JsonResponse("Deleted",safe=False)


@csrf_exempt
def customerOnlineApi(request, cid=0):
    if request.method == 'GET':
        orders = CustomersOnline.objects.all()
        print(customers)
        customers_serializer = CustomersOnlineSerializer(customers, many=True)
        return JsonResponse(customers_serializer.data, safe=False)
    elif request.method == 'POST':
        customer_data = JSONParser().parse(request)
        customers_serializer = CustomersOnlineSerializer(data=customer_data)
        print(customers_serializer)
        if customers_serializer.is_valid():
            customers_serializer.save()
            return JsonResponse("Added",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method == 'PUT':
        customer_data = JSONParser().parse(request)
        customer = CustomersOnline.objects.get(customerId=customer_data['CustomersOnlineId'])
        customer_serializer = CustomersOnlineSerializer(customer,data=customer_data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        customer = CustomersOnline.objects.get(customerId = cid)
        customer.delete()
        return JsonResponse("Deleted",safe=False)


@csrf_exempt
def salesOrderOnlineApi(request, soid=0):
    if request.method == 'GET':
        orders = SalesOrderOnline.objects.all()
        print(orders)
        sales_order_serializer = SalesOrderOnlineSerializer(orders, many=True)
        return JsonResponse(sales_order_serializer.data, safe=False)
    elif request.method == 'POST':
        order_data = JSONParser().parse(request)
        sales_order_serializer = SalesOrderOnlineSerializer(data=order_data)
        print(sales_order_serializer)
        if sales_order_serializer.is_valid():
            sales_order_serializer.save()
            return JsonResponse("Added",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method == 'PUT':
        order_data = JSONParser().parse(request)
        order = SalesOrderOnline.objects.get(orderId=order_data['SalesOrderOnlineId'])
        sales_order_serializer = SalesOrderOnlineSerializer(order,data=order_data)
        if sales_order_serializer.is_valid():
            sales_order_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        order = SalesOrderOnline.objects.get(orderId = soid)
        order.delete()
        return JsonResponse("Deleted",safe=False)
