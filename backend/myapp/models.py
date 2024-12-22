from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class Comment(models.Model):
    audio = models.ForeignKey('AudioFile', on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}: {self.text[:20]}'

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    # 必要に応じて追加フィールド
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

class AudioFile(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    file = models.FileField(upload_to='audio_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='audio_files')
    likes = models.PositiveIntegerField(default=0)
