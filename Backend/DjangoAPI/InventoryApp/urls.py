from django.conf.urls import url
from InventoryApp import views

urlpatterns=[
    url(r'^category/$',views.categoryApi),
    url(r'^category/([0-9]+)$',views.categoryApi),
    url(r'^brand/$',views.brandApi),
    url(r'brand/([0-9]+)$',views.brandApi)
]