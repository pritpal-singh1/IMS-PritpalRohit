from rest_framework import serializers
from InventoryApp.models import Category, Brand,Employee,SalesOrderOfflineDetail, SalesOrdersOffline,Supplier, Role, AdminUser, Product, CustomersOnline, SalesOrderOnline, CompanyDetails



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
                'SupplierName',
                'CompanyName',
                'Address',
                'City',
                'State',
                'Pincode',
                'Email',
                'Contact',
                'PANNo',
                'GSTIN',
                'CreatedAt')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields=('EmployeeId',
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
        fields = ('CompanyName',
        'OwnerName',
        'GSTIN',
        'panNo',
        'Address',
        'ZipCode',
        'Country',
        'ContactNumber',
        'EmailId')
