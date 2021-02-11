from django.conf.urls import url
from InventoryApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^category/$',views.categoryApi),
    url(r'^category/([0-9]+)$',views.categoryApi),
    url(r'^brand/$',views.brandApi),
    url(r'brand/([0-9]+)$',views.brandApi),

    url(r'^SaveFile$',views.SaveProductImage)
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)