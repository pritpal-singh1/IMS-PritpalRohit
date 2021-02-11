from django.db import models


# Create your models here.

class Role(models.Model):
    RoleName = models.CharField(max_length=100)
    def __str__(self):
        return self.RoleName

class Employee(models.Model):
    EmployeeName=models.CharField(max_length=100)
    Gender=models.CharField(max_length=10)
    Address= models.CharField(max_length=100)
    EmailId=models.CharField(max_length=100)
    MobiileNo=models.CharField(max_length=20)
    DOB=models.DateField()
    CreatedAt=models.DateTimeField(auto_now_add=True)
    ContactPerson=models.CharField(max_length=100)
    ContactPersonNo=models.CharField(max_length=100)
    AdharNo=models.CharField(max_length=100)
    JoiningDate=models.DateField()

    def __str__(self):
        return self.EmployeeName

class AdminUser(models.Model):
    EmployeeId=models.ForeignKey(Employee,on_delete=models.CASCADE)
    Password = models.CharField(max_length=100)
    UserId = models.CharField(max_length=100)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Status=models.CharField(max_length=100)
    Role=models.ForeignKey(Role,on_delete=models.CASCADE)
    def __str__(self):
        return self.EmployeeId


class Category(models.Model):
    CategoryName = models.CharField(max_length=100)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.CategoryName


class Brand(models.Model):
    BrandName = models.CharField(max_length=100)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.BrandName

class Product(models.Model):
    BrandId = models.ForeignKey(Brand,on_delete=models.CASCADE)
    CategoryId = models.ForeignKey(Category, on_delete=models.CASCADE)
    ProductName=models.CharField(max_length=100)
    ItemCode=models.CharField(max_length=100)
    PrintName = models.CharField(max_length=100)
    PurchasePrice=models.CharField(max_length=100)
    SalePrice=models.CharField(max_length=100)
    MRP=models.CharField(max_length=100)
    LowLevelLimit=models.CharField(max_length=100)
    Discount=models.CharField(max_length=10)
    GST=models.CharField(max_length=10)
    StockQTY=models.CharField(max_length=10)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    ProductImage=models.CharField(max_length=100)
    def __str__(self):
        return self.ProductName

class Supplier(models.Model):
    SupplierName=models.CharField(max_length=100)
    CompanyName=models.CharField(max_length=100)
    Address = models.CharField(max_length=100)
    City=models.CharField(max_length=100)
    State=models.CharField(max_length=100)
    Pincode = models.CharField(max_length=100)
    Email = models.CharField(max_length=100)
    Contact=models.CharField(max_length=100)
    PANNo=models.CharField(max_length=100)
    GSTIN=models.CharField(max_length=100)
    ContactPerson=models.CharField(max_length=100)
    ContactPersonNo=models.CharField(max_length=100)
    Status=models.CharField(max_length=100)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.ProductName

class CustomersOnline(models.Model):
    CustomerName=models.CharField(max_length=100)
    EmailId=models.CharField(max_length=100)
    Password=models.CharField(max_length=100)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Status=models.CharField(max_length=100)
    def __str__(self):
        return self.CustomerName


class SalesOrderOnline(models.Model):
    InvoiceNo=models.CharField(max_length=100)
    Date=models.DateTimeField(auto_now_add=True)
    Contact=models.CharField(max_length=20)
    CustomerId=models.ForeignKey(CustomersOnline,on_delete=models.CASCADE)
    BillingName=models.CharField(max_length=100)
    Address=models.CharField(max_length=100)
    PaymentStatus=models.CharField(max_length=100)
    OrderStatus=models.CharField(max_length=100)
    TotalAmount=models.CharField(max_length=100)

    def __str__(self):
        return self.InvoiceNo

class SalesOrderOnlineDetail(models.Model):
    SalesOrderOnlineId=models.ForeignKey(SalesOrderOnline,on_delete=models.CASCADE)
    ProductId=models.ForeignKey(Product,on_delete=models.CASCADE)
    Quantity=models.CharField(max_length=10)

    SalePrice=models.CharField(max_length=10)
    Amount=models.CharField(max_length=10)
    Discount=models.CharField(max_length=10)

    def __str__(self):
        return self.pk


