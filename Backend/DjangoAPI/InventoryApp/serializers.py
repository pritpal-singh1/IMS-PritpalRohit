from rest_framework import serializers
from InventoryApp.models import Category
from InventoryApp.models import Brand,Employee,SalesOrderOfflineDetail
from InventoryApp.models import SalesOrdersOffline,Supplier

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
                'PaymentMode',
                'TotalAmount',
                'AmountPaid',
                'Status',
                'CreatedAt')
class SalesOrderOfflineDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=SalesOrderOfflineDetail
        fields=('SalesOrderOfflineDetailId',
                'SalesOrdersOfflineId',
                'ProductId',
                'Quantity',
                'SalePrice',
                'Amount',
                'Discount',
               )

