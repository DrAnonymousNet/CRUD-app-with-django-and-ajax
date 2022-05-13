
from django.contrib import admin
from django.urls import path
from Book.views import book_create, index, update_delete_book
from . import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", index, name= 'index'),
    path('book/', book_create, name='book_create'),
    path('book/<int:id>',update_delete_book, name="others")
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

