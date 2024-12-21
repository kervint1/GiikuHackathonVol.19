from django.db import models

class Account(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

class AudioFile(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    file = models.FileField(upload_to='audio_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
