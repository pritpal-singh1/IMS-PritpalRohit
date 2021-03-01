# Generated by Django 3.1.2 on 2021-02-26 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InventoryApp', '0003_salesorderofflinedetail_gst'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('ExpenseId', models.AutoField(primary_key=True, serialize=False)),
                ('Date', models.DateTimeField()),
                ('ExpenseType', models.CharField(max_length=100)),
                ('Amount', models.CharField(max_length=100)),
                ('PaidTo', models.CharField(max_length=100)),
                ('PaidBy', models.CharField(max_length=100)),
                ('Remarks', models.CharField(max_length=100)),
            ],
        ),
    ]