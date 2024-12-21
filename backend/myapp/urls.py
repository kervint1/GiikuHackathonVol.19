from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from myapp.views import upload_audio

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/upload-audio/', upload_audio, name='upload-audio'),
]

# urlpatterns の外側で static を追加
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
