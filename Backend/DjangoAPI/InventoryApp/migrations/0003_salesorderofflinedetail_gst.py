# Generated by Django 3.1.2 on 2021-02-25 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InventoryApp', '0002_auto_20210225_1310'),
    ]

    operations = [
        migrations.AddField(
            model_name='salesorderofflinedetail',
            name='GST',
            field=models.CharField(default=0, max_length=10),
        ),
    ]