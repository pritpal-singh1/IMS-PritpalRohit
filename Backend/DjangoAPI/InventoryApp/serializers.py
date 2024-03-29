from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from InventoryApp.models import Category, Brand,Employee,SalesOrderOfflineDetail,User, SalesOrdersOffline,Supplier, \
                                                                                      Role,\
                                                                                   AdminUser, Product, CustomersOnline, SalesOrderOnline, CompanyDetails, Expense, PurchaseBill, PurchaseBillDetail, PurchaseOrder, PurchaseOrderDetail, PurchaseReturn, PurchaseReturnDetail,StockAdjustments, SalesReturn, SalesReturnDetail
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


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




class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model=Supplier
        fields=('SupplierId',
                # 'SupplierName',
                'CompanyName',
                'Address',
                'City',
                'State',
                'Pincode',
                'Email',
                'Contact',
                'PANNo',
                'GSTIN',
                'ContactPerson',
                # 'Status',
                'ContactPersonNo',
                'CreatedAt')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields=('EmployeeId',
                'EmployeeNo',
                'EmployeeName',
                'Gender',
                'Address',
                'EmailId',
                'MobileNo',
                'DOB',
                'CreatedAt',
                'ContactPerson',
                'ContactPersonNo',
                'AdhaarNo',
                'JoiningDate')

class SalesOrdersOfflineSerializer(serializers.ModelSerializer):
    class Meta:
        model=SalesOrdersOffline
        fields=('SalesOrderOfflineId',
                'InvoiceNo',
                'Date',
                'CustomerName',
                'Contact',
                'SubTotal',
                'GST',
                'PaymentMode',
                'TotalAmount',
                'AmountPaid',
                'Balance',
                'Status',
                'CreatedAt')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('ProductId',
        'Brand',
        'Category',
        'ProductName',
        'ItemCode',
        'PrintName',
        'PurchasePrice',
        'SalePrice',
        'MRP',
        'LowLevelLimit',
        'Discount',
        'GST',
        'StockQTY',
        'CreatedAt',
        'ProductImage')

class SalesOrderOfflineDetailSerializer(serializers.ModelSerializer):
    # SalesOrdersOfflineId=SalesOrdersOfflineSerializer()
    # ProductId=ProductSerializer()
    class Meta:
        model=SalesOrderOfflineDetail
        fields=('SalesOrderOfflineDetailId',
                'SalesOrdersOfflineId',
                'ProductId',
                'Quantity',
                'SalePrice',
                'Amount',
                'GST',
               )

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('RoleId',
                'RoleName')

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ('AdminUserid',
        'EmployeeId',
        'Password',
        'UserId',
        'CreatedAt',
        'Status',
        'Role')

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ('ProductId',
#         'Brand',
#         'Category',
#         'ProductName',
#         'ItemCode',
#         'PrintName',
#         'PurchasePrice',
#         'SalePrice',
#         'MRP',
#         'LowLevelLimit',
#         'Discount',
#         'GST',
#         'StockQTY',
#         'CreatedAt',
#         'ProductImage')

class CustomersOnlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomersOnline
        fields = ('CustomersOnlineId',
        'CustomerName',
        'EmailId',
        'Password',
        'CreatedAt',
        'Status')


class SalesOrderOnlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesOrderOnline
        fields = ('SalesOrderOnlineId',
        'InvoiceNo',
        'Date',
        'Contact',
        'CustomerId',
        'BillingName',
        'Address',
        'PaymentStatus',
        'OrderStatus',
        'TotalAmount')

class CompanyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDetails
        fields = ('CompanyId',
            'CompanyName',
        'OwnerName',
        'GSTIN',
        'PanNo',
        'Address',
        'ZipCode',
        'Country',
        'ContactNumber',
        'EmailId')

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('ExpenseId',
        'Date',
        'ExpenseType',
        'Amount',
        'PaidTo',
        'PaidBy',
        'Remarks')

class PurchaseBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseBill
        fields = (
        'PurchaseBillId',
        'BillNo',
        'Date',
        'Supplier',
        'PurchaseType',
        'Contact',
        'TotalAmount',
        'AmountPaid',
        # 'PaymentMode',
        'Status',
        'CreatedAt',
        'Balance',
        'GST',
        'SubTotal')

class PurchaseBillDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseBillDetail
        fields = ('PurchaseBillDetailId',
        'PurchaseBillId',
        'ProductId',
        'Quantity',
        'SalePrice',
        'Amount',
        # 'Discount'
        )

class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = ('PurchaseOrderId',
        'BillNo',
        'Date',
        'Supplier',
        'PurchaseType',
        'Contact',
        'TotalAmount',
        'AmountPaid',
        'Status',
        'CreatedAt',
        'Balance',
        'GST',
        'SubTotal')

class PurchaseOrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderDetail
        fields = ('PurchaseOrderDetailId',
        'PurchaseOrderId',
        'ProductId',
        'Quantity',
        'SalePrice',
        'Amount',
        'GST')


class PurchaseReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseReturn
        fields = (
            'PurchaseReturnId',
            'ReturnBillNo',
            'PurchaseBillNo',
            'Date',
            'Supplier',
            'ReturnType',
            'TotalAmount',
            'AmountPaid',
            'Status',
            'CreatedAt',
            'Balance',
            'GST',
            'SubTotal'
        )

class PurchaseReturnDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseReturnDetail
        fields = (
            'PurchaseReturnDetailId',
            'PurchaseReturnId',
            'ProductId',
            'Quantity',
            'SalePrice',
            'Amount',
            'GST'
        )
class StockAdjustmentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockAdjustments
        fields = ('StockAdjustmentsId',
            'Date',
        'Type',
        'Reason',
        'ProductId',
        'Quantity',
        'Amount',
        'Remarks')

class SalesReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesReturn
        fields = (
            'SalesReturnId',
            'SalesReturnNo',
            'InvoiceNo',
            'Reason',
            'Contact',
            'Date',
            'ClientName',
            'PaymentMode',
            'TotalAmount',
            'AmountPaid',
            'Status',
            'CreatedAt',
            'Balance',
            'GST',
            'SubTotal'
        )

class SalesReturnDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesReturnDetail
        fields = (
            'SalesReturnDetailId',
            'ProductId',
            'SalesReturnId',
            'Quantity',
            'SalePrice',
            'Amount',
            'GST'
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['UserId','password','email','Status','Role','EmployeeId']

    def create(self,validated_data):
        password=validated_data.pop('password',None)
        instance=self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


class ChangePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['password']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance



