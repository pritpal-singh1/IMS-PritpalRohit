from django.db import models

# Create your models here.

class Role(models.Model):
    RoleId = models.AutoField(primary_key=True)
    RoleName = models.CharField(max_length=100)
    def __str__(self):
        return self.RoleName

class Employee(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName=models.CharField(max_length=100)
    Gender=models.CharField(max_length=10)
    Address= models.CharField(max_length=100)
    EmailId=models.CharField(max_length=100)
    MobileNo=models.CharField(max_length=20)
    DOB=models.DateField()
    CreatedAt=models.DateTimeField(auto_now_add=True)
    ContactPerson=models.CharField(max_length=100)
    ContactPersonNo=models.CharField(max_length=100)
    AdhaarNo=models.CharField(max_length=100)
    JoiningDate=models.DateField()

    def __str__(self):
        return self.EmployeeName

class AdminUser(models.Model):
    AdminUserid = models.AutoField(primary_key=True)
    EmployeeId=models.ForeignKey(Employee,on_delete=models.CASCADE)
    Password = models.CharField(max_length=100)
    UserId = models.CharField(max_length=100)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Status=models.CharField(max_length=100)
    Role=models.ForeignKey(Role,db_column="RoleId",on_delete=models.CASCADE)
    def __str__(self):
        return self.UserId


class Category(models.Model):
    CategoryId=models.AutoField(primary_key=True)
    CategoryName = models.CharField(max_length=100)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.CategoryName


class Brand(models.Model):
    BrandId=models.AutoField(primary_key=True)
    BrandName = models.CharField(max_length=100)
    def __str__(self):
        return self.BrandName


class Product(models.Model):
    ProductId = models.AutoField(primary_key=True)
    Brand = models.ForeignKey(Brand,db_column='BrandId',on_delete=models.CASCADE)
    Category = models.ForeignKey(Category, db_column='CategoryId', on_delete=models.CASCADE)
    ProductName=models.CharField(max_length=100)
    ItemCode=models.CharField(max_length=100)
    PrintName = models.CharField(max_length=100)
    PurchasePrice=models.CharField(max_length=100)
    SalePrice=models.CharField(max_length=100)
    MRP=models.CharField(max_length=100)
    LowLevelLimit=models.IntegerField()
    Discount=models.CharField(max_length=10)
    GST=models.CharField(max_length=10)
    StockQTY=models.IntegerField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    ProductImage=models.CharField(max_length=100)



class Supplier(models.Model):
    SupplierId=models.AutoField(primary_key=True)
    # SupplierName=models.CharField(max_length=100)
    CompanyName=models.CharField(max_length=100)
    Address = models.CharField(max_length=100)
    City=models.CharField(max_length=100)
    State=models.CharField(max_length=100)
    Pincode = models.CharField(max_length=100)
    Email = models.CharField(max_length=100)
    Contact=models.CharField(max_length=100)
    PANNo=models.CharField(max_length=100)
    GSTIN=models.CharField(max_length=100)
    # Status=models.CharField(max_length=100)
    ContactPerson = models.CharField(max_length=100, default="ABC")
    ContactPersonNo = models.CharField(max_length=100,default="1234567890")
    CreatedAt = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.CompanyName

class CustomersOnline(models.Model):
    CustomersOnlineId=models.AutoField(primary_key=True)
    CustomerName=models.CharField(max_length=100)
    EmailId=models.CharField(max_length=100)
    Password=models.CharField(max_length=100)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Status=models.CharField(max_length=100)
    def __str__(self):
        return self.CustomerName


class SalesOrderOnline(models.Model):
    SalesOrderOnlineId=models.AutoField(primary_key=True)
    InvoiceNo=models.CharField(max_length=100)
    Date=models.DateTimeField(auto_now_add=True)
    Contact=models.CharField(max_length=20)
    CustomerId=models.ForeignKey(CustomersOnline,db_column="CustomersOnlineId",on_delete=models.CASCADE)
    BillingName=models.CharField(max_length=100)
    Address=models.CharField(max_length=100)
    PaymentStatus=models.CharField(max_length=100)
    OrderStatus=models.CharField(max_length=100)
    TotalAmount=models.CharField(max_length=100)

    def __str__(self):
        return self.InvoiceNo

class SalesOrderOnlineDetail(models.Model):
    SalesOrderOnlineDetailId=models.AutoField(primary_key=True)
    SalesOrderOnlineId=models.ForeignKey(SalesOrderOnline, db_column="SalesOrderOnlineId",on_delete=models.CASCADE)
    ProductId=models.ForeignKey(Product,db_column="ProductId",on_delete=models.CASCADE)
    Quantity=models.CharField(max_length=10)
    SalePrice=models.CharField(max_length=10)
    Amount=models.CharField(max_length=10)
    Discount=models.CharField(max_length=10)

    def __str__(self):
        return self.Amount

class SalesOrdersOffline(models.Model):
    SalesOrderOfflineId = models.AutoField(primary_key=True)
    InvoiceNo=models.CharField(max_length=100)
    Date=models.DateField()
    CustomerName=models.CharField(max_length=100)
    Contact=models.CharField(max_length=100)
    PaymentMode=models.CharField(max_length=100,)
    SubTotal=models.CharField(max_length=100,default=0)
    GST = models.CharField(max_length=100,default=0)
    TotalAmount=models.CharField(max_length=10)
    AmountPaid=models.CharField(max_length=10)
    Status=models.CharField(max_length=10)
    Balance=models.CharField(max_length=10,default=0)
    CreatedAt=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.InvoiceNo

class SalesOrderOfflineDetail(models.Model):
    SalesOrderOfflineDetailId = models.AutoField(primary_key=True)
    SalesOrdersOfflineId=models.ForeignKey(SalesOrdersOffline,db_column="SalesOrderOfflineId",on_delete=models.CASCADE)
    ProductId=models.ForeignKey(Product,related_name="products",db_column="ProductId",on_delete=models.CASCADE)
    Quantity=models.CharField(max_length=10)
    GST = models.CharField(max_length=10,default=0)
    SalePrice=models.CharField(max_length=10)
    Amount=models.CharField(max_length=10)

    def __str__(self):
        return self.SalesOrderOfflineDetailId

class PurchaseBill(models.Model):
    PurchaseBillId = models.AutoField(max_length=100,primary_key=True)
    BillNo=models.CharField(max_length=100)
    Date=models.DateTimeField()
    Supplier=models.ForeignKey(Supplier,db_column="SupplierId",on_delete=models.CASCADE)
    PurchaseType=models.CharField(max_length=100)
    Contact=models.CharField(max_length=100)
    TotalAmount=models.CharField(max_length=10)
    AmountPaid=models.CharField(max_length=10)
    # PaymentMode=models.CharField(max_length=10)
    Status=models.CharField(max_length=10)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Balance=models.CharField(max_length=100)
    GST = models.CharField(max_length=100)
    SubTotal=models.CharField(max_length=100)
    def __str__(self):
        return self.BillNo

class PurchaseBillDetail(models.Model):
    PurchaseBillDetailId=models.AutoField(primary_key=True)
    PurchaseBillDetailId=models.ForeignKey(PurchaseBill,db_column="PurchaseBillId",on_delete=models.CASCADE)
    ProductId=models.ForeignKey(Product,db_column="ProductId",on_delete=models.CASCADE)
    Quantity=models.CharField(max_length=10)
    SalePrice=models.CharField(max_length=10)
    Amount=models.CharField(max_length=10)
    # Discount=models.CharField(max_length=10)

    def __str__(self):
        return self.Amount

class CompanyDetails(models.Model):
    CompanyId = models.AutoField(primary_key=True)
    CompanyName = models.CharField(max_length=100)
    OwnerName = models.CharField(max_length=100)
    GSTIN = models.CharField(max_length=20)
    PanNo = models.CharField(max_length=20)
    Address = models.CharField(max_length=100)
    ZipCode = models.CharField(max_length=10)
    Country = models.CharField(max_length=20)
    ContactNumber = models.CharField(max_length=15)
    EmailId = models.CharField(max_length=50)

class Expense(models.Model):
    ExpenseId = models.AutoField(primary_key=True)
    Date = models.DateTimeField()
    ExpenseType = models.CharField(max_length=100)
    Amount = models.CharField(max_length=100)
    PaidTo = models.CharField(max_length=100)
    PaidBy = models.CharField(max_length=100)
    Remarks = models.CharField(max_length=100)


class PurchaseOrder(models.Model):
    PurchaseOrderId = models.AutoField(primary_key=True)
    BillNo=models.CharField(max_length=100)
    Date=models.DateTimeField()
    Supplier=models.ForeignKey(Supplier,db_column="SupplierId",on_delete=models.CASCADE)
    PurchaseType=models.CharField(max_length=100)
    Contact=models.CharField(max_length=100)
    TotalAmount=models.CharField(max_length=10)
    AmountPaid=models.CharField(max_length=10)
    Status=models.CharField(max_length=10)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Balance=models.CharField(max_length=100)
    GST = models.CharField(max_length=100)
    SubTotal=models.CharField(max_length=100)
    def __str__(self):
        return self.BillNo
        
class StockAdjustments(models.Model):
    StockAdjustmentsId=models.AutoField(primary_key=True)
    Date=models.DateField()
    Type=models.CharField(max_length=10)
    Reason=models.CharField(max_length=30)
    ProductId=models.ForeignKey(Product,db_column="ProductId",on_delete=models.CASCADE)
    Quantity=models.IntegerField()
    Amount=models.IntegerField()
    Remarks=models.CharField(max_length=200)




class PurchaseOrderDetail(models.Model):
    PurchaseOrderDetailId=models.AutoField(primary_key=True)
    PurchaseOrderId = models.ForeignKey(PurchaseOrder,db_column="PurchaseOrderId",on_delete=models.CASCADE)
    ProductId=models.ForeignKey(Product,db_column="ProductId",on_delete=models.CASCADE)
    Quantity=models.CharField(max_length=10)
    SalePrice=models.CharField(max_length=10)
    Amount=models.CharField(max_length=10)
    GST = models.CharField(max_length=100)

class PurchaseReturn(models.Model):
    PurchaseReturnId = models.AutoField(primary_key=True)
    ReturnBillNo = models.CharField(max_length=100)
    PurchaseBillNo = models.CharField(max_length=100)
    Date = models.DateTimeField()
    Supplier = models.ForeignKey(Supplier,db_column="SupplierId",on_delete=models.CASCADE)
    ReturnType = models.CharField(max_length=100)
    TotalAmount=models.CharField(max_length=10)
    AmountPaid=models.CharField(max_length=10)
    Status=models.CharField(max_length=10)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Balance=models.CharField(max_length=100)
    GST = models.CharField(max_length=100)
    SubTotal=models.CharField(max_length=100)

class PurchaseReturnDetail(models.Model):
    PurchaseReturnDetailId = models.AutoField(primary_key=True)
    ProductId=models.ForeignKey(Product,db_column="ProductId",on_delete=models.CASCADE)
    PurchaseReturnId = models.ForeignKey(PurchaseReturn, db_column="PurchaseReturnId", on_delete=models.CASCADE)
    Quantity=models.CharField(max_length=10)
    SalePrice=models.CharField(max_length=10)
    Amount=models.CharField(max_length=10)
    GST = models.CharField(max_length=100)


class SalesReturn(models.Model):
    SalesReturnId = models.AutoField(primary_key=True)
    SalesReturnNo = models.CharField(max_length=100)
    InvoiceNo=models.ForeignKey(SalesOrdersOffline,db_column="InvoiceNo",on_delete=models.CASCADE)
    Reason = models.CharField(max_length=100)
    Contact = models.CharField(max_length=100)
    Date = models.DateTimeField()
    ClientName = models.CharField(max_length=100)
    PaymentMode = models.CharField(max_length=100)
    TotalAmount=models.CharField(max_length=10)
    AmountPaid=models.CharField(max_length=10)
    Status=models.CharField(max_length=10)
    CreatedAt=models.DateTimeField(auto_now_add=True)
    Balance=models.CharField(max_length=100)
    GST = models.CharField(max_length=100)
    SubTotal=models.CharField(max_length=100)


class SalesReturnDetail(models.Model):
    SalesReturnDetailId = models.AutoField(primary_key=True)
    ProductId=models.ForeignKey(Product,db_column="ProductId",on_delete=models.CASCADE)
    SalesReturnId = models.ForeignKey(SalesReturn, db_column="SalesReturnId", on_delete=models.CASCADE)
    Quantity=models.CharField(max_length=10)
    SalePrice=models.CharField(max_length=10)
    Amount=models.CharField(max_length=10)
    GST = models.CharField(max_length=100)