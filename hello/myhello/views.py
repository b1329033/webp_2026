from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

# 引入你的兩個 Models
from .models import Post, Course, User

# 設定 Logger (老師要求)
logger = logging.getLogger('django')

# --- Post 功能區 (練習用) ---

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')
    
    new_post = Post(title=title, content=content, photo=photo, location=location)
    new_post.save()
    
    logger.debug("************** Post added: " + title)
    return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return Response({
        "data": json.dumps(list(posts), sort_keys=True, indent=1, cls=DjangoJSONEncoder)
    }, status=status.HTTP_200_OK)


# --- Course 功能區 (作業 HW#1 用) ---

@api_view(['GET'])
def add_course(request):
    dept = request.GET.get('Department', '')
    title = request.GET.get('CourseTitle', '')
    teacher = request.GET.get('Instructor', '')
    
    new_c = Course(Department=dept, CourseTitle=title, Instructor=teacher)
    new_c.save()
    
    logger.debug("************** Course added: " + title)
    return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_course(request):
    courses = Course.objects.all().values()
    return JsonResponse(list(courses), safe=False)

@api_view(['GET'])
def list_users(request):
    users = User.objects.all().values()
    return JsonResponse(list(users), safe=False)