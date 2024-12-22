from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import AudioFile
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_audio(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        title = request.POST.get('title', 'Untitled')
        user = request.user  # ユーザーを取得

        audio = AudioFile.objects.create(title=title, file=file, user=user)  # ユーザーを保存
        return JsonResponse({'message': 'File uploaded successfully', 'file_id': audio.id})
    return JsonResponse({'error': 'Invalid request'}, status=400)

@api_view(['GET'])
def list_audio(request):
    audio_files = AudioFile.objects.all().values('id', 'file', 'title', 'user__username')  # ユーザー名を追加
    return JsonResponse(list(audio_files), safe=False)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_audio(request, id):
    try:
        audio = get_object_or_404(AudioFile, id=id)  # IDでオブジェクトを取得
        audio.delete()
        return JsonResponse({'message': 'Audio deleted successfully'})
    except Exception as e:
        print(f"Error deleting audio: {e}")  # ログにエラーを出力
        return JsonResponse({'error': 'Failed to delete audio'}, status=500)