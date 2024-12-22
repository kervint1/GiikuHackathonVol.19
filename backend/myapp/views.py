from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import AudioFile
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Comment

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_audio(request):
    audio_files = AudioFile.objects.filter(user=request.user).values('id', 'file', 'title', 'user__username', 'likes')
    return JsonResponse(list(audio_files), safe=False)

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
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_audio(request, id):
    audio = get_object_or_404(AudioFile, id=id)
    audio.likes += 1
    audio.save()
    return JsonResponse({'message': 'Audio liked', 'likes': audio.likes})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_audio(request, id):
    audio = get_object_or_404(AudioFile, id=id)
    if audio.likes > 0:
        audio.likes -= 1
        audio.save()
    return JsonResponse({'message': 'Audio unliked', 'likes': audio.likes})

@api_view(['GET'])
def list_comments(request, audio_id):
    comments = Comment.objects.filter(audio_id=audio_id).values('id', 'user__username', 'text', 'created_at')
    return JsonResponse(list(comments), safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, audio_id):
    audio = get_object_or_404(AudioFile, id=audio_id)
    text = request.data.get('text')
    if text:
        comment = Comment.objects.create(audio=audio, user=request.user, text=text)
        return JsonResponse({'id': comment.id, 'user': request.user.username, 'text': comment.text, 'created_at': comment.created_at}, status=201)
    return JsonResponse({'error': 'Text is required'}, status=400)