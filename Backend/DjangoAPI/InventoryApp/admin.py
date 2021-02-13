from django.contrib import admin
from .models import Category, Brand, \
    Role, Employee, AdminUser, Product, Supplier, SalesOrderOnline,CustomersOnline, \
    SalesOrderOnlineDetail,SalesOrdersOffline,SalesOrderOfflineDetail,PurchaseBill, \
    PurchaseBillDetail

# Register your models here.
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Role)
admin.site.register(Employee)
admin.site.register(AdminUser)
admin.site.register(Product)
admin.site.register(Supplier)
admin.site.register(SalesOrderOnline)
admin.site.register(CustomersOnline)
admin.site.register(SalesOrderOnlineDetail)
admin.site.register(SalesOrdersOffline)
admin.site.register(SalesOrderOfflineDetail)
admin.site.register(PurchaseBill)
admin.site.register(PurchaseBillDetail)


