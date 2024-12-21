from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import AudioFile
import json

@csrf_exempt
def upload_audio(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        title = request.POST.get('title', 'Untitled')
        
        # ファイルを保存
        audio = AudioFile.objects.create(title=title, file=file)
        return JsonResponse({'message': 'File uploaded successfully', 'file_id': audio.id})
    
    return JsonResponse({'error': 'Invalid request'}, status=400)
