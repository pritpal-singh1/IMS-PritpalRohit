from django.conf.urls import url
from InventoryApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^category/$',views.categoryApi),
    url(r'^category/([0-9]+)$',views.categoryApi),

    url(r'^brand/$',views.brandApi),
    url(r'brand/([0-9]+)$',views.brandApi),
    url(r'^adminUser/$',views.adminApi),
    url(r'adminUser/([0-9]+)$',views.adminApi),
    url(r'^product/$',views.productApi),
    url(r'product/([0-9]+)$',views.productDetailApi),
    url(r'^product/$',views.productApi),
    url(r'^customersOnline/$',views.adminApi),
    url(r'customersOnline/([0-9]+)$',views.adminApi),
    url(r'^salesOrderOnline/$',views.adminApi),
    url(r'salesOrderOnline/([0-9]+)$',views.adminApi),
    url(r'getSalesById/([0-9]+)$',views.getSalesOrderById),
    url(r'getInvoiceNo/$',views.getInvoiceNo),

    url(r'^newsale/$',views.newSalesOrder),
    url(r'^newsale/([0-9]+)$',views.newSalesOrder),

    url(r'supplier/([0-9]+)$',views.supplierApi),
    url(r'^supplier/$',views.supplierApi),

    url(r'employee/([0-9]+)$',views.employeeApi),
    url(r'^employee/$',views.employeeApi),
    url(r'^companyDetails/$',views.CompanyDetailsApi),
    url(r'^companyDetails/([0-9]+)$',views.CompanyDetailsApi),
    url(r'expense/([0-9]+)$',views.expenseApi),
    url(r'^expense/$',views.expenseApi),

    url(r'stockdata/([0-9]+)$',views.stockAvailibilityApi),
    url(r'stockdata/$',views.stockAvailibilityApi),
    url(r'^expense/$',views.expenseApi),
    url(r'^lowlevellimit/$',views.lowLevelLimitApi),



    url(r'^SaveFile$',views.SaveProductImage)
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)