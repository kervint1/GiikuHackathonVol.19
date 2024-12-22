from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from myapp.views import upload_audio,list_audio,delete_audio,like_audio,unlike_audio,list_comments,add_comment
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/upload-audio/', upload_audio, name='upload-audio'),
    path('api/list-audio/', list_audio, name='list-audio'),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/delete-audio/<int:id>/', delete_audio, name='delete-audio'),
    path('api/like-audio/<int:id>/', like_audio, name='like-audio'),
    path('api/unlike-audio/<int:id>/', unlike_audio, name='unlike-audio'),
    path('api/audio/<int:audio_id>/comments/', list_comments, name='list-comments'),
    path('api/audio/<int:audio_id>/add-comment/', add_comment, name='add-comment'),
]

# urlpatterns の外側で static を追加
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
