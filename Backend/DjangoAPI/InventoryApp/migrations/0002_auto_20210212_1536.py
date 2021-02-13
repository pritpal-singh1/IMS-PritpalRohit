# Generated by Django 3.1.2 on 2021-02-12 10:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('InventoryApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomersOnline',
            fields=[
                ('CustomersOnlineId', models.AutoField(primary_key=True, serialize=False)),
                ('CustomerName', models.CharField(max_length=100)),
                ('EmailId', models.CharField(max_length=100)),
                ('Password', models.CharField(max_length=100)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
                ('Status', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('EmployeeId', models.AutoField(primary_key=True, serialize=False)),
                ('EmployeeName', models.CharField(max_length=100)),
                ('Gender', models.CharField(max_length=10)),
                ('Address', models.CharField(max_length=100)),
                ('EmailId', models.CharField(max_length=100)),
                ('MobileNo', models.CharField(max_length=20)),
                ('DOB', models.DateField()),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
                ('ContactPerson', models.CharField(max_length=100)),
                ('ContactPersonNo', models.CharField(max_length=100)),
                ('AdhaarNo', models.CharField(max_length=100)),
                ('JoiningDate', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('ProductId', models.AutoField(primary_key=True, serialize=False)),
                ('ProductName', models.CharField(max_length=100)),
                ('ItemCode', models.CharField(max_length=100)),
                ('PrintName', models.CharField(max_length=100)),
                ('PurchasePrice', models.CharField(max_length=100)),
                ('SalePrice', models.CharField(max_length=100)),
                ('MRP', models.CharField(max_length=100)),
                ('LowLevelLimit', models.CharField(max_length=100)),
                ('Discount', models.CharField(max_length=10)),
                ('GST', models.CharField(max_length=10)),
                ('StockQTY', models.CharField(max_length=10)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
                ('ProductImage', models.CharField(max_length=100)),
                ('Brand', models.ForeignKey(db_column='BrandId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.brand')),
                ('Category', models.ForeignKey(db_column='CategoryId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.category')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseBill',
            fields=[
                ('BillNo', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('Date', models.DateTimeField()),
                ('PurchaseType', models.CharField(max_length=100)),
                ('Contact', models.CharField(max_length=100)),
                ('TotalAmount', models.CharField(max_length=10)),
                ('AmountPaid', models.CharField(max_length=10)),
                ('PaymentMode', models.CharField(max_length=10)),
                ('Status', models.CharField(max_length=10)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('RoleId', models.AutoField(primary_key=True, serialize=False)),
                ('RoleName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SalesOrderOnline',
            fields=[
                ('SalesOrderOnlineId', models.AutoField(primary_key=True, serialize=False)),
                ('InvoiceNo', models.CharField(max_length=100)),
                ('Date', models.DateTimeField(auto_now_add=True)),
                ('Contact', models.CharField(max_length=20)),
                ('BillingName', models.CharField(max_length=100)),
                ('Address', models.CharField(max_length=100)),
                ('PaymentStatus', models.CharField(max_length=100)),
                ('OrderStatus', models.CharField(max_length=100)),
                ('TotalAmount', models.CharField(max_length=100)),
                ('CustomerId', models.ForeignKey(db_column='CustomersOnlineId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.customersonline')),
            ],
        ),
        migrations.CreateModel(
            name='SalesOrdersOffline',
            fields=[
                ('SalesOrderOfflineId', models.AutoField(primary_key=True, serialize=False)),
                ('InvoiceNo', models.CharField(max_length=100)),
                ('Date', models.DateTimeField()),
                ('CustomerName', models.CharField(max_length=100)),
                ('Contact', models.CharField(max_length=100)),
                ('PaymentMode', models.CharField(max_length=100)),
                ('TotalAmount', models.CharField(max_length=10)),
                ('AmountPaid', models.CharField(max_length=10)),
                ('Status', models.CharField(max_length=10)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('SupplierId', models.AutoField(primary_key=True, serialize=False)),
                ('SupplierName', models.CharField(max_length=100)),
                ('CompanyName', models.CharField(max_length=100)),
                ('Address', models.CharField(max_length=100)),
                ('City', models.CharField(max_length=100)),
                ('State', models.CharField(max_length=100)),
                ('Pincode', models.CharField(max_length=100)),
                ('Email', models.CharField(max_length=100)),
                ('Contact', models.CharField(max_length=100)),
                ('PANNo', models.CharField(max_length=100)),
                ('GSTIN', models.CharField(max_length=100)),
                ('ContactPerson', models.CharField(max_length=100)),
                ('ContactPersonNo', models.CharField(max_length=100)),
                ('Status', models.CharField(max_length=100)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SalesOrderOnlineDetail',
            fields=[
                ('SalesOrderOnlineDetailId', models.AutoField(primary_key=True, serialize=False)),
                ('Quantity', models.CharField(max_length=10)),
                ('SalePrice', models.CharField(max_length=10)),
                ('Amount', models.CharField(max_length=10)),
                ('Discount', models.CharField(max_length=10)),
                ('ProductId', models.ForeignKey(db_column='ProductId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.product')),
                ('SalesOrderOnlineId', models.ForeignKey(db_column='SalesOrderOnlineId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.salesorderonline')),
            ],
        ),
        migrations.CreateModel(
            name='SalesOrderOfflineDetail',
            fields=[
                ('SalesOrderOfflineDetailId', models.AutoField(primary_key=True, serialize=False)),
                ('Quantity', models.CharField(max_length=10)),
                ('SalePrice', models.CharField(max_length=10)),
                ('Amount', models.CharField(max_length=10)),
                ('Discount', models.CharField(max_length=10)),
                ('ProductId', models.ForeignKey(db_column='ProductId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.product')),
                ('SalesOrdersOfflineId', models.ForeignKey(db_column='SalesOrderOfflineId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.salesordersoffline')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseBillDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Quantity', models.CharField(max_length=10)),
                ('SalePrice', models.CharField(max_length=10)),
                ('Amount', models.CharField(max_length=10)),
                ('Discount', models.CharField(max_length=10)),
                ('ProductId', models.ForeignKey(db_column='ProductId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.product')),
                ('PurchaseBillDetailId', models.ForeignKey(db_column='BillNo', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.purchasebill')),
            ],
        ),
        migrations.AddField(
            model_name='purchasebill',
            name='Supplier',
            field=models.ForeignKey(db_column='SupplierId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.supplier'),
        ),
        migrations.CreateModel(
            name='AdminUser',
            fields=[
                ('AdminUserid', models.AutoField(primary_key=True, serialize=False)),
                ('Password', models.CharField(max_length=100)),
                ('UserId', models.CharField(max_length=100)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
                ('Status', models.CharField(max_length=100)),
                ('EmployeeId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.employee')),
                ('Role', models.ForeignKey(db_column='RoleId', on_delete=django.db.models.deletion.CASCADE, to='InventoryApp.role')),
            ],
        ),
    ]