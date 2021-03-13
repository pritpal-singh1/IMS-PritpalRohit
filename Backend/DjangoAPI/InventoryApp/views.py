from django.db.models import F
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.forms.models import model_to_dict
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import json

from InventoryApp.models import Category, Brand, Role, AdminUser, Product, CustomersOnline, SalesOrderOnline, \
    Supplier, Employee,SalesOrdersOffline,SalesOrderOfflineDetail, Expense,CompanyDetails, PurchaseBill, \
    PurchaseBillDetail, PurchaseOrder,PurchaseOrderDetail,StockAdjustments,PurchaseReturn, PurchaseReturnDetail, SalesReturn, SalesReturnDetail
from InventoryApp.serializers import CategorySerializer, BrandSerializer, RoleSerializer, AdminSerializer, \
    ProductSerializer, CustomersOnlineSerializer, SalesOrderOnlineSerializer, SupplierSerializer, EmployeeSerializer,\
    SalesOrdersOfflineSerializer,SalesOrderOfflineDetailSerializer,ExpenseSerializer,CompanyDetailsSerializer, \
    PurchaseBillSerializer,PurchaseBillDetailSerializer,PurchaseOrderSerializer, PurchaseOrderDetailSerializer,StockAdjustmentsSerializer,\
    SalesOrdersOfflineSerializer, SalesOrderOfflineDetailSerializer, ExpenseSerializer, CompanyDetailsSerializer, PurchaseBillSerializer, PurchaseBillDetailSerializer, PurchaseOrderSerializer, PurchaseOrderDetailSerializer, StockAdjustmentsSerializer, PurchaseReturnSerializer, PurchaseReturnDetailSerializer, SalesReturnSerializer,SalesReturnDetailSerializer


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
def newSalesOrder(request,sid=0):
    if request.method=="POST":
        sales_order=JSONParser().parse(request)
        salesItems=sales_order['SalesItems']
        sales_order_offline=dict(list(sales_order.items())[:len(sales_order)-1])
        sales_order_serializer = SalesOrdersOfflineSerializer(data=sales_order_offline)
        sales_order_serializer.is_valid(raise_exception=True)
        if sales_order_serializer.is_valid():
            sales_order_serializer.save()
            sales_order_offline_id=sales_order_serializer.data['SalesOrderOfflineId']

        for i in salesItems:
            sales_order_offline_detail=i
            sales_order_offline_detail['SalesOrdersOfflineId']=sales_order_offline_id
            sales_order_detail_serializer = SalesOrderOfflineDetailSerializer(data=sales_order_offline_detail)
            sales_order_detail_serializer.is_valid(raise_exception=True)
            if sales_order_detail_serializer.is_valid():
                sales_order_detail_serializer.save()
                res=updateProductQuantityForAdd(sales_order_detail_serializer.data['ProductId'],i['Quantity'])
                salesOrderSuccess = "Invoice Successfully Added"
        return JsonResponse({"SalesId" : sales_order_offline_id}, safe=False)
    elif request.method == 'GET':
        orders = SalesOrdersOffline.objects.all()

        order_serializer = SalesOrdersOfflineSerializer(orders, many=True)
        return JsonResponse(order_serializer.data, safe=False)
    elif request.method == 'DELETE':
        orderdetail=SalesOrderOfflineDetail.objects.filter(SalesOrdersOfflineId=sid)
        for i in orderdetail:
            i.delete()
        orders = SalesOrdersOffline.objects.get(SalesOrderOfflineId = sid)
        orders.delete()
        return JsonResponse("Deleted",safe=False)

    elif request.method == 'PUT':
        sales_order=JSONParser().parse(request)
        salesItems = sales_order['SalesItems']

        sales_order_offline_recieved = dict(list(sales_order.items())[:len(sales_order) - 1])
        sales_order_offline = SalesOrdersOffline.objects.get(SalesOrderOfflineId=sales_order_offline_recieved[
            'SalesOrderOfflineId'])
        sales_order_serializer = SalesOrdersOfflineSerializer(sales_order_offline, data=sales_order_offline_recieved)
        if sales_order_serializer.is_valid():
            sales_order_serializer.save()
        salesorderdetail = SalesOrderOfflineDetail.objects.filter(SalesOrdersOfflineId=sales_order_offline_recieved[
            'SalesOrderOfflineId'])

        for i in salesorderdetail:
            res = updateProductQuantityForUpdate(model_to_dict(i.ProductId)['ProductId'], i.Quantity)
            i.delete()
        for i in salesItems:
            sales_order_offline_detail=i
            sales_order_offline_detail['SalesOrdersOfflineId']=sales_order_offline_recieved[
            'SalesOrderOfflineId']
            sales_order_detail_serializer = SalesOrderOfflineDetailSerializer(data=sales_order_offline_detail)
            sales_order_detail_serializer.is_valid(raise_exception=True)
            if sales_order_detail_serializer.is_valid():
                sales_order_detail_serializer.save()
                res=updateProductQuantityForAdd(sales_order_detail_serializer.data['ProductId'],i['Quantity'])

        return JsonResponse("updated", safe=False)


def getSalesOrderById(request,sid=0):
    try:
        ResData={}
        orders = SalesOrdersOffline.objects.get(SalesOrderOfflineId=sid)

        orderdetails=SalesOrderOfflineDetail.objects.filter(SalesOrdersOfflineId=sid).select_related("ProductId")
        index = 0
        for i in orderdetails:

            orderdetails_serializer = SalesOrderOfflineDetailSerializer(i)

            ResData[index] =orderdetails_serializer.data

            index+=1
            # print(orderdetails_serializer.data['ProductId']['ProductId'])
        orders_serializer=SalesOrdersOfflineSerializer(orders)

        FinalData=orders_serializer.data
        FinalData['SalesItems']=ResData

        return JsonResponse(FinalData,safe=False)
    except SalesOrdersOffline.DoesNotExist:
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)



@csrf_exempt
def getInvoiceNo(request):
    if request.method == 'GET':
        o = SalesOrdersOffline.objects.order_by('SalesOrderOfflineId')
        if o.count()==0:
            return JsonResponse(0, safe=False)
        else:
            obj = SalesOrdersOffline.objects.order_by('SalesOrderOfflineId')[len(o)-1:]

            return JsonResponse(obj.values()[0]['SalesOrderOfflineId'], safe=False)

# substracts in product quantity
def updateProductQuantityForAdd(pid,quantity):
        try:
            product = Product.objects.get(ProductId=pid)

        except Product.DoesNotExist:
            return 'The Product does not exist'
        product_serializer = ProductSerializer(product,  data=model_to_dict(product))

        product_serializer.is_valid(raise_exception=True)
        if product_serializer.is_valid():
            print(product_serializer.validated_data['StockQTY'])
            product_serializer.validated_data['StockQTY']=int(product_serializer.validated_data['StockQTY'])-int(quantity)
            product_serializer.save()
            return "Success"

# adds in Product Quantity
def updateProductQuantityForUpdate(pid, quantity):
    try:
        product = Product.objects.get(ProductId=pid)

    except Product.DoesNotExist:
        return 'The Product does not exist'
    product_serializer = ProductSerializer(product, data=model_to_dict(product))

    product_serializer.is_valid(raise_exception=True)
    if product_serializer.is_valid():
        print(product_serializer.validated_data['StockQTY'])
        product_serializer.validated_data['StockQTY'] = int(product_serializer.validated_data['StockQTY']) + int(
            quantity)
        product_serializer.save()
        return "Success"

# Sales Return 
@csrf_exempt
def newSalesReturn(request,rid=0):
    if request.method=="POST":
        sales_return=JSONParser().parse(request)
        ReturnItems=sales_return['ReturnItem']
        sales_return_offline=dict(list(sales_return.items())[:len(sales_return)-1])
        sales_return_serializer = SalesReturnSerializer(data=sales_return_offline)
        sales_return_serializer.is_valid(raise_exception=True)
        if sales_return_serializer.is_valid():
            sales_return_serializer.save()
            sales_return_offline_id=sales_return_serializer.data['SalesReturnId']

        for i in ReturnItems:
            sales_return_offline_detail=i
            sales_return_offline_detail['SalesReturnId']=sales_return_offline_id
            sales_return_detail_serializer = SalesReturnDetailSerializer(data=sales_return_offline_detail)
            sales_return_detail_serializer.is_valid(raise_exception=True)
            if sales_return_detail_serializer.is_valid():
                sales_return_detail_serializer.save()
                res=updateProductQuantityForUpdate(sales_return_detail_serializer.data['ProductId'],i['Quantity'])
                # salesOrderSuccess = "Invoice Successfully Added"
        return JsonResponse({"SalesId" : sales_return_offline_id}, safe=False)
    elif request.method == 'GET':
        returns = SalesReturn.objects.all()

        return_serializer = SalesReturnSerializer(returns, many=True)
        return JsonResponse(return_serializer.data, safe=False)
    elif request.method == 'DELETE':
        returndetail=SalesReturnDetail.objects.filter(SalesReturnId=rid)
        for i in returndetail:
            i.delete()
        returns = SalesReturn.objects.get(SalesReturnId = rid)
        returns.delete()
        return JsonResponse("Deleted",safe=False)

    elif request.method == 'PUT':
        return_order=JSONParser().parse(request)
        ReturnItems = return_order['ReturnItem']

        sales_return_offline_recieved = dict(list(return_order.items())[:len(return_order) - 1])
        sales_return_offline = SalesReturn.objects.get(SalesReturnId=sales_return_offline_recieved[
            'SalesReturnId'])
        sales_return_serializer = SalesReturnSerializer(sales_return_offline, data=sales_return_offline_recieved)
        if sales_return_serializer.is_valid():
            sales_return_serializer.save()
        salesreturndetail = SalesReturnDetail.objects.filter(SalesReturnId=sales_return_offline_recieved[
            'SalesReturnId'])

        for i in salesreturndetail:
            res = updateProductQuantityForAdd(model_to_dict(i.ProductId)['ProductId'], i.Quantity)
            i.delete()
        for i in ReturnItems:
            sales_return_offline_detail=i
            sales_return_offline_detail['SalesReturnId']=sales_return_offline_recieved[
            'SalesReturnId']
            sales_return_detail_serializer = SalesReturnDetailSerializer(data=sales_return_offline_detail)
            sales_return_detail_serializer.is_valid(raise_exception=True)
            if sales_return_detail_serializer.is_valid():
                sales_return_detail_serializer.save()
                res=updateProductQuantityForUpdate(sales_return_detail_serializer.data['ProductId'],i['Quantity'])

        return JsonResponse("updated", safe=False)


@csrf_exempt
def getSalesInvoices(request):
    if request.method == 'GET':
        res = []
        invoices = SalesOrdersOffline.objects.all()

        for i in invoices:
            result = {'invoiceNumber': i.InvoiceNo, 'invoiceId': i.SalesOrderOfflineId}

            res.append(result)
        print(res)
        return JsonResponse(res, safe=False)

def getSalesReturnById(request,rid=0):
    try:
        ResData={}
        returns = SalesReturn.objects.get(SalesReturnId=rid)

        returndetails=SalesReturnDetail.objects.filter(SalesReturnId=rid).select_related("ProductId")
        index = 0
        for i in returndetails:

            returndetails_serializer = SalesReturnDetailSerializer(i)

            ResData[index] =returndetails_serializer.data

            index+=1
            # print(orderdetails_serializer.data['ProductId']['ProductId'])
        return_serializer=SalesReturnSerializer(returns)

        FinalData=return_serializer.data
        FinalData['ReturnItem']=ResData

        return JsonResponse(FinalData,safe=False)
    except SalesOrdersOffline.DoesNotExist:
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)

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
        product = Product.objects.get(ProductId=product_data['ProductId'])
        product_serializer = ProductSerializer(product,data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        product = Product.objects.get(ProductId = pid)
        product.delete()
        return JsonResponse("Deleted",safe=False)

@csrf_exempt
def productDetailApi(request, pid=0):
    if request.method == 'GET':
        try:
            product = Product.objects.get(ProductId=pid)
            print(product)
        except Product.DoesNotExist:
            return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            product_serializer = ProductSerializer(product)
            return JsonResponse(product_serializer.data,safe=False)
    elif request.method == 'DELETE':
        product = Product.objects.get(ProductId = pid)
        product.delete()
        return JsonResponse("Deleted",safe=False)


@csrf_exempt
def customerOnlineApi(request, cid=0):
    if request.method == 'GET':
        customers = CustomersOnline.objects.all()
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

@csrf_exempt
def expenseApi(request, eid=0):
    if request.method == 'GET':
        expenses = Expense.objects.all()
        expense_serializer = ExpenseSerializer(expenses, many=True)
        return JsonResponse(expense_serializer.data, safe=False)
    elif request.method == 'POST':
        expense_data = JSONParser().parse(request)
        print(expense_data)
        expense_serializer = ExpenseSerializer(data=expense_data)
        print(expense_serializer)
        expense_serializer.is_valid(raise_exception=True)
        if expense_serializer.is_valid():
            expense_serializer.save()
            return JsonResponse("Added",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method == 'PUT':
        expense_data = JSONParser().parse(request)
        expense = Expense.objects.get(ExpenseId=expense_data['ExpenseId'])
        expense_serializer = ExpenseSerializer(expense,data=expense_data)
        if expense_serializer.is_valid():
            expense_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)
    elif request.method == 'DELETE':
        expense = Expense.objects.get(ExpenseId = eid)
        expense.delete()
        return JsonResponse("Deleted",safe=False)

@csrf_exempt
def CompanyDetailsApi(request, eid=0):
    if request.method == 'GET':
        companydetails = CompanyDetails.objects.get(CompanyId=1)
        companydetails_serializer = CompanyDetailsSerializer(companydetails)
        print(companydetails_serializer.data)
        return JsonResponse(companydetails_serializer.data, safe=False)

    elif request.method == 'PUT':
        companydetails_data = JSONParser().parse(request)
        companydetails = CompanyDetails.objects.get(CompanyId=companydetails_data['CompanyId'])
        companydetails_serializer = CompanyDetailsSerializer(companydetails,data=companydetails_data)
        if companydetails_serializer.is_valid():
            companydetails_serializer.save()
            return JsonResponse("updated",safe=False)
        return JsonResponse("failed to update",safe=False)


@csrf_exempt
def getPurchaseInvoiceNo(request):
    if request.method == 'GET':
        o = PurchaseBill.objects.order_by('PurchaseBillId')
        if o.count()==0:
            return JsonResponse(0, safe=False)
        else:
            obj = PurchaseBill.objects.order_by('PurchaseBillId')[len(o)-1:]

            return JsonResponse(obj.values()[0]['PurchaseBillId'], safe=False)

@csrf_exempt
def newPurchaseBill(request,pid=0):
    if request.method=="POST":
        purchase_bill=JSONParser().parse(request)
        purchaseItems=purchase_bill['purchaseItems']
        purchase_bills=dict(list(purchase_bill.items())[:len(purchase_bill)-1])
        purchase_bill_serializer = PurchaseBillSerializer(data=purchase_bills)
        purchase_bill_serializer.is_valid(raise_exception=True)
        if purchase_bill_serializer.is_valid():
            purchase_bill_serializer.save()
            purchase_bill_id=purchase_bill_serializer.data['PurchaseBillId']

        for i in purchaseItems:
            purchase_bill_detail=i
            purchase_bill_detail['PurchaseBillId']=purchase_bill_id
            purchase_bill_detail_serializer = PurchaseBillDetailSerializer(data=purchase_bill_detail)
            purchase_bill_detail_serializer.is_valid(raise_exception=True)
            if purchase_bill_detail_serializer.is_valid():
                purchase_bill_detail_serializer.save()
                # res=updateProductQuantityForAdd(purchase_bill_detail_serializer.data['ProductId'],i['Quantity'])
                # purchase_bill_Added = "Purchase Bill Successfully Added"
        return JsonResponse({"response":"Purchase Bill Successfully Added","PurchaseId":purchase_bill_id}, safe=False)
    elif request.method == 'GET':
        bills = PurchaseBill.objects.all()

        bills_serializer = PurchaseBillSerializer(bills, many=True)
        return JsonResponse(bills_serializer.data, safe=False)
    elif request.method == 'DELETE':
        # import pdb;pdb.set_trace()
        billdetail=PurchaseBillDetail.objects.filter(PurchaseBillId=pid)
        for i in billdetail:
            i.delete()
        bills = PurchaseBill.objects.get(PurchaseBillId = pid)
        bills.delete()
        return JsonResponse("Deleted",safe=False)
    elif request.method == 'PUT':
        purchase_bill=JSONParser().parse(request)
        purchaseItems = purchase_bill['purchaseItems']

        purchase_bill_recieved = dict(list(purchase_bill.items())[:len(purchase_bill) - 1])
        purchase_bill = PurchaseBill.objects.get(PurchaseBillId=purchase_bill_recieved[
            'PurchaseBillId'])
        purchase_bill_serializer = PurchaseBillSerializer(purchase_bill, data=purchase_bill_recieved)
        if purchase_bill_serializer.is_valid():
            purchase_bill_serializer.save()
        purchasebilldetail = PurchaseBillDetail.objects.filter(PurchaseBillId=purchase_bill_recieved[
            'PurchaseBillId'])

        for i in purchasebilldetail:
            # res = updateProductQuantityForUpdate(model_to_dict(i.ProductId)['ProductId'], i.Quantity)
            i.delete()
        for i in purchaseItems:
            purchase_bill_detail=i
            purchase_bill_detail['PurchaseBillId']=purchase_bill_recieved[
            'PurchaseBillId']
            purchase_bill_detail_serializer = PurchaseBillDetailSerializer(data=purchase_bill_detail)
            purchase_bill_detail_serializer.is_valid(raise_exception=True)
            if purchase_bill_detail_serializer.is_valid():
                purchase_bill_detail_serializer.save()
                # res=updateProductQuantityForAdd(purchase_bill_detail_serializer.data['ProductId'],i['Quantity'])

        return JsonResponse("updated", safe=False)


def getPurchaseBillById(request,pid=0):
    try:
        ResData={}
        bills = PurchaseBill.objects.get(PurchaseBillId=pid)

        purchase_details=PurchaseBillDetail.objects.filter(PurchaseBillId=pid).select_related("ProductId")
        index = 0
        for i in purchase_details:

            purchase_bill_serializer = PurchaseBillDetailSerializer(i)

            ResData[index] =purchase_bill_serializer.data

            index+=1
            # print(orderdetails_serializer.data['ProductId']['ProductId'])
        bills_serializer=PurchaseBillSerializer(bills)

        FinalData=bills_serializer.data
        FinalData['purchaseItems']=ResData

        return JsonResponse(FinalData,safe=False)
    except SalesOrdersOffline.DoesNotExist:
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def getPurchaseOrderNo(request):
    if request.method == 'GET':
        o = PurchaseOrder.objects.order_by('PurchaseOrderId')
        if o.count()==0:
            return JsonResponse(0, safe=False)
        else:
            obj = PurchaseOrder.objects.order_by('PurchaseOrderId')[len(o)-1:]

            return JsonResponse(obj.values()[0]['PurchaseOrderId'], safe=False)



@csrf_exempt
def newPurchaseOrder(request,pid=0):
    if request.method=="POST":
        purchase_order=JSONParser().parse(request)
        purchaseItems=purchase_order['purchaseItems']
        purchase_orders=dict(list(purchase_order.items())[:len(purchase_order)-1])
        purchase_order_serializer = PurchaseOrderSerializer(data=purchase_orders)
        purchase_order_serializer.is_valid(raise_exception=True)
        if purchase_order_serializer.is_valid():
            purchase_order_serializer.save()
            purchase_order_id=purchase_order_serializer.data['PurchaseOrderId']

        for i in purchaseItems:
            purchase_order_detail=i
            purchase_order_detail['PurchaseOrderId']=purchase_order_id
            purchase_order_detail_serializer = PurchaseOrderDetailSerializer(data=purchase_order_detail)
            purchase_order_detail_serializer.is_valid(raise_exception=True)
            if purchase_order_detail_serializer.is_valid():
                purchase_order_detail_serializer.save()
                # res=updateProductQuantityForAdd(purchase_bill_detail_serializer.data['ProductId'],i['Quantity'])
                # purchase_bill_Added = "Purchase Bill Successfully Added"
        return JsonResponse({"response":"Purchase Order Successfully Added","PurchaseId":purchase_order_id}, safe=False)
    elif request.method == 'GET':
        orders = PurchaseOrder.objects.all()

        orders_serializer = PurchaseOrderSerializer(orders, many=True)
        return JsonResponse(orders_serializer.data, safe=False)
    elif request.method == 'DELETE':
        # import pdb;pdb.set_trace()
        orderdetail=PurchaseOrderDetail.objects.filter(PurchaseOrderId=pid)
        for i in orderdetail:
            i.delete()
        orders = PurchaseOrder.objects.get(PurchaseOrderId = pid)
        orders.delete()
        return JsonResponse("Deleted",safe=False)

    elif request.method == 'PUT':
        purchase_order=JSONParser().parse(request)
        purchaseItems = purchase_order['purchaseItems']

        purchase_order_recieved = dict(list(purchase_order.items())[:len(purchase_order) - 1])
        purchase_order = PurchaseOrder.objects.get(PurchaseOrderId=purchase_order_recieved[
            'PurchaseOrderId'])
        purchase_order_serializer = PurchaseOrderSerializer(purchase_order, data=purchase_order_recieved)
        if purchase_order_serializer.is_valid():
            purchase_order_serializer.save()
        purchaseorderdetail = PurchaseOrderDetail.objects.filter(PurchaseOrderId=purchase_order_recieved[
            'PurchaseOrderId'])

        for i in purchaseorderdetail:
            # res = updateProductQuantityForUpdate(model_to_dict(i.ProductId)['ProductId'], i.Quantity)
            i.delete()
        for i in purchaseItems:
            purchase_order_detail=i
            purchase_order_detail['PurchaseOrderId']=purchase_order_recieved[
            'PurchaseOrderId']
            purchase_order_detail_serializer = PurchaseOrderDetailSerializer(data=purchase_order_detail)
            purchase_order_detail_serializer.is_valid(raise_exception=True)
            if purchase_order_detail_serializer.is_valid():
                purchase_order_detail_serializer.save()
                # res=updateProductQuantityForAdd(purchase_bill_detail_serializer.data['ProductId'],i['Quantity'])

        return JsonResponse("updated", safe=False)


def getPurchaseOrderById(request,pid=0):
    try:
        ResData={}
        orders = PurchaseOrder.objects.get(PurchaseOrderId=pid)

        purchase_details=PurchaseOrderDetail.objects.filter(PurchaseOrderDetailId=pid).select_related("ProductId")
        index = 0
        for i in purchase_details:

            purchase_order_serializer = PurchaseOrderDetailSerializer(i)

            ResData[index] =purchase_order_serializer.data

            index+=1
            # print(orderdetails_serializer.data['ProductId']['ProductId'])
        orders_serializer=PurchaseOrderSerializer(orders)

        FinalData=orders_serializer.data
        FinalData['purchaseItems']=ResData

        return JsonResponse(FinalData,safe=False)
    except SalesOrdersOffline.DoesNotExist:
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def getPurchaseReturnNo(request):
    if request.method == 'GET':
        o = PurchaseReturn.objects.order_by('PurchaseReturnId')
        if o.count()==0:
            return JsonResponse(0, safe=False)
        else:
            obj = PurchaseReturn.objects.order_by('PurchaseReturnId')[len(o)-1:]

            return JsonResponse(obj.values()[0]['PurchaseReturnId'], safe=False)


@csrf_exempt
def newPurchaseReturn(request,pid=0):
    if request.method=="POST":
        purchase_return=JSONParser().parse(request)
        purchaseItems=purchase_return['purchaseItems']
        purchase_returns=dict(list(purchase_return.items())[:len(purchase_return)-1])
        purchase_return_serializer = PurchaseReturnSerializer(data=purchase_returns)
        purchase_return_serializer.is_valid(raise_exception=True)
        if purchase_return_serializer.is_valid():
            purchase_return_serializer.save()
            purchase_return_id=purchase_return_serializer.data['PurchaseReturnId']

        for i in purchaseItems:
            purchase_return_detail=i
            purchase_return_detail['PurchaseReturnId']=purchase_return_id
            purchase_return_detail_serializer = PurchaseReturnDetailSerializer(data=purchase_return_detail)
            purchase_return_detail_serializer.is_valid(raise_exception=True)
            if purchase_return_detail_serializer.is_valid():
                purchase_return_detail_serializer.save()
                res=updatePurchaseReturnQuantityAdd(purchase_return_detail_serializer.data['ProductId'],i['Quantity'])
                # purchase_bill_Added = "Purchase Bill Successfully Added"
        return JsonResponse({"response":"Purchase Order Successfully Added","PurchaseId":purchase_return_id}, safe=False)
    elif request.method == 'GET':
        returns = PurchaseReturn.objects.all()

        return_serializer = PurchaseReturnSerializer(returns, many=True)
        return JsonResponse(return_serializer.data, safe=False)
    elif request.method == 'DELETE':
        # import pdb;pdb.set_trace()
        returndetail=PurchaseReturnDetail.objects.filter(PurchaseReturnId=pid)
        for i in returndetail:
            i.delete()
        returns = PurchaseReturn.objects.get(PurchaseReturnId = pid)
        returns.delete()
        return JsonResponse("Deleted",safe=False)

    elif request.method == 'PUT':
        purchase_order=JSONParser().parse(request)
        purchaseItems = purchase_order['purchaseItems']

        purchase_order_recieved = dict(list(purchase_order.items())[:len(purchase_order) - 1])
        purchase_order = PurchaseOrder.objects.get(PurchaseReturnId=purchase_order_recieved[
            'PurchaseReturnId'])
        purchase_order_serializer = PurchaseOrderSerializer(purchase_order, data=purchase_order_recieved)
        if purchase_order_serializer.is_valid():
            purchase_order_serializer.save()
        purchaseorderdetail = PurchaseOrderDetail.objects.filter(PurchaseReturnId=purchase_order_recieved[
            'PurchaseReturnId'])

        for i in purchaseorderdetail:
            res = updateProductQuantityForUpdate(model_to_dict(i.ProductId)['ProductId'], i.Quantity)
            i.delete()
        for i in purchaseItems:
            purchase_order_detail=i
            purchase_order_detail['PurchaseReturnId']=purchase_order_recieved[
            'PurchaseReturnId']
            purchase_order_detail_serializer = PurchaseOrderDetailSerializer(data=purchase_order_detail)
            purchase_order_detail_serializer.is_valid(raise_exception=True)
            if purchase_order_detail_serializer.is_valid():
                purchase_order_detail_serializer.save()
                res=updateProductQuantityForAdd(purchase_bill_detail_serializer.data['ProductId'],i['Quantity'])

        return JsonResponse("updated", safe=False)


def getPurchaseReturnById(request,pid=0):
    try:
        ResData={}
        returns = PurchaseReturn.objects.get(PurchaseReturnId=pid)

        purchase_details=PurchaseReturnDetail.objects.filter(PurchaseReturnId=pid).select_related("ProductId")
        index = 0
        for i in purchase_details:

            purchase_return_serializer = PurchaseReturnDetailSerializer(i)

            ResData[index] =purchase_return_serializer.data

            index+=1
            # print(orderdetails_serializer.data['ProductId']['ProductId'])
        returns_serializer=PurchaseReturnSerializer(returns)

        FinalData=returns_serializer.data
        FinalData['purchaseItems']=ResData

        return JsonResponse(FinalData,safe=False)
    except SalesOrdersOffline.DoesNotExist:
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)

def getPurchaseBillByBillno(request,bno=0):
    try:
        ResData={}
        bills = PurchaseBill.objects.get(BillNo=bno)
        bills_serializer=PurchaseBillSerializer(bills)
        FinalData=bills_serializer.data
        purchasebillid = FinalData['PurchaseBillId']
        # import pdb;pdb.set_trace()
        print(purchasebillid)
        purchase_details=PurchaseBillDetail.objects.filter(PurchaseBillId=purchasebillid).select_related("ProductId")
        index = 0
        for i in purchase_details:

            purchase_bill_serializer = PurchaseBillDetailSerializer(i)

            ResData[index] =purchase_bill_serializer.data

            index+=1
            # print(orderdetails_serializer.data['ProductId']['ProductId'])
        
        FinalData['purchaseItems']=ResData

        return JsonResponse(FinalData,safe=False)
    except SalesOrdersOffline.DoesNotExist:
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)

def updatePurchaseReturnQuantityAdd(pid, quantity):
        try:
            product = Product.objects.get(ProductId=pid)

        except Product.DoesNotExist:
            return 'The Product does not exist'
        product_serializer = ProductSerializer(product,  data=model_to_dict(product))

        product_serializer.is_valid(raise_exception=True)
        if product_serializer.is_valid():
            print(product_serializer.validated_data['StockQTY'])
            product_serializer.validated_data['StockQTY']=int(product_serializer.validated_data['StockQTY'])+int(quantity)
            product_serializer.save()
            return "Success"

@csrf_exempt
def stockAvailibilityApi(request):
    if request.method=='POST':
        queryData = JSONParser().parse(request)
        print(queryData)
        StockData = Product.objects.all()
        if queryData['brandId']:
            StockData = StockData.filter(Brand=queryData['brandId'])
        if queryData['productId']:
            StockData = StockData.filter(ProductId=queryData['productId'])
        if queryData['categoryId']:
            StockData = StockData.filter(Category=queryData['categoryId'])
        if queryData['itemCode']:
            StockData = StockData.filter(ItemCode=queryData['itemCode'])
    StockDataSerializer = ProductSerializer(StockData, many=True)
    return JsonResponse(StockDataSerializer.data,safe=False)

@csrf_exempt
def lowLevelLimitApi(request):
    if request.method=='GET':
        result=Product.objects.filter(LowLevelLimit__gte=F('StockQTY'))
        print(result)

    LowLevelLimitSerializer = ProductSerializer(result, many=True)


    return JsonResponse(LowLevelLimitSerializer.data,safe=False)


@csrf_exempt
def stockAdjustmentsApi(request,sdid=0):
    if request.method == 'GET':
        res=[]
        stockadj = StockAdjustments.objects.all()
        e=StockAdjustments.objects.select_related()
        for i in e:
            result = {'ProductName': i.ProductId.ProductName, 'StockAdjustmentsId': i.StockAdjustmentsId,
                      'Type': i.Type, 'Reason': i.Reason, 'Date': i.Date, 'Quantity': i.Quantity,'ProductId':
                          i.ProductId.ProductId,
                      'Amount': i.Amount, 'Remarks': i.Remarks}

            res.append(result)
        print(res)

        stockadj_serializer = StockAdjustmentsSerializer(stockadj, many=True)
        print(stockadj_serializer.data)
        return JsonResponse(res ,safe=False)
    elif request.method == 'POST':
        stockadj_data = JSONParser().parse(request)
        print(stockadj_data)
        stockadj_serializer = StockAdjustmentsSerializer(data=stockadj_data)
        print(stockadj_serializer)
        stockadj_serializer.is_valid(raise_exception=True)

        if stockadj_data['Type']=="Credit":
            updateProductQuantityForCredit(stockadj_data['ProductId'], stockadj_data['Quantity'])
        else:
            updateProductQuantityForAdd(stockadj_data['ProductId'], stockadj_data['Quantity'])
        if stockadj_serializer.is_valid():
            stockadj_serializer.save()
            return JsonResponse("Added", safe=False)
        return JsonResponse("Failed to add", safe=False)
    elif request.method == 'PUT':
        stockadj_data = JSONParser().parse(request)
        stockadj = StockAdjustments.objects.get(StockAdjustmentsId=stockadj_data['StockAdjustmentsId'])
        stockadj_serializer = StockAdjustmentsSerializer(stockadj, data=stockadj_data)
        updateProductQuantityForUpdate(stockadj_data['ProductId'], stockadj_data['Quantity'])
        if stockadj_serializer.is_valid():
            stockadj_serializer.save()
            return JsonResponse("updated", safe=False)
        return JsonResponse("failed to update", safe=False)
    elif request.method == 'DELETE':
        stockadj = StockAdjustments.objects.get(StockAdjustmentsId=sdid)
        stockadj.delete()
        return JsonResponse("Deleted", safe=False)

@csrf_exempt
def getStockAdjustmentByIdApi(request,sid=0):
    if request.method == 'GET':
        try:
            stockadjustment = StockAdjustments.objects.get(StockAdjustmentsId=sid)

        except StockAdjustments.DoesNotExist:
            return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            stockadjustment_serializer = StockAdjustmentsSerializer(stockadjustment)
            return JsonResponse(stockadjustment_serializer.data, safe=False)

@csrf_exempt
def getProductListName(request):
    if request.method == 'GET':
        res = []
        stockadj = Product.objects.all()

        for i in stockadj:
            result = {'ProductName': i.ProductName, 'ProductId': i.ProductId}

            res.append(result)
        print(res)
        return JsonResponse(res, safe=False)

def updateProductQuantityForCredit(pid, quantity):
    try:
        product = Product.objects.get(ProductId=pid)

    except Product.DoesNotExist:
        return 'The Product does not exist'
    product_serializer = ProductSerializer(product, data=model_to_dict(product))

    product_serializer.is_valid(raise_exception=True)
    if product_serializer.is_valid():
        print(product_serializer.validated_data['StockQTY'])
        product_serializer.validated_data['StockQTY'] = int(product_serializer.validated_data['StockQTY']) + int(
            quantity)
        product_serializer.save()
        return "Success"