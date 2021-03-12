from django.conf.urls import url
from InventoryApp import views
from django.urls import path


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

    # for purchase 
    url(r'^getPurchaseInvoiceNo/$',views.getPurchaseInvoiceNo),
    url(r'^addPurchaseBill/$',views.newPurchaseBill),
    url(r'^addPurchaseBill/([0-9]+)$',views.newPurchaseBill),
    url(r'^getPurchaseBillById/([0-9]+)$',views.getPurchaseBillById),
     
    url(r'^getPurchaseOrderNo/$',views.getPurchaseOrderNo),
    url(r'^addPurchaseOrder/$',views.newPurchaseOrder),
    url(r'^addPurchaseOrder/([0-9]+)$',views.newPurchaseOrder),
    url(r'^getPurchaseOrderById/([0-9]+)$',views.getPurchaseOrderById),

    url(r'^getPurchaseReturnNo/$',views.getPurchaseReturnNo),
    url(r'^addPurchaseReturn/$',views.newPurchaseReturn),
    url(r'^addPurchaseReturn/([0-9]+)$',views.newPurchaseReturn),

    url(r'^getPurchaseBillByBillno/(INV-00[0-9]+)$',views.getPurchaseBillByBillno),


     
    
    url(r'stockdata/([0-9]+)$',views.stockAvailibilityApi),
    url(r'stockdata/$',views.stockAvailibilityApi),
    url(r'^expense/$',views.expenseApi),
    url(r'^lowlevellimit/$',views.lowLevelLimitApi),
    url(r'stockadjustment/([0-9]+)$',views.stockAdjustmentsApi),
    url(r'stockadjustment/$',views.stockAdjustmentsApi),
    url(r'getProductListName/$',views.getProductListName),
    url(r'stockadjusmentsbyid/([0-9]+)$',views.getStockAdjustmentByIdApi),
    url(r'^SaveFile$',views.SaveProductImage),
    url(r'register/$',views.register),
    url(r'login/$',views.login),
    url(r'getEmployeeListName/$',views.getAllEmployees),
    url(r'getAllUsers/$',views.getUsers),
    url(r'getAllUsers/([0-9]+)$',views.getUsers),
    url(r'getUserById/([0-9]+)$',views.getUserDetailsById),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)