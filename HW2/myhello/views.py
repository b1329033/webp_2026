from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import logging
from .models import Course  # 這裡只引入 Course
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
def ex3_view(request):
    return render(request, 'index.html')
logger = logging.getLogger('django')

@api_view(['GET'])
def add_course(request):
    # 取得 URL 參數
    dept = request.GET.get('Department', '')
    title = request.GET.get('CourseTitle', '')
    teacher = request.GET.get('Instructor', '')
    
    # 建立並儲存資料
    new_c = Course(Department=dept, CourseTitle=title, Instructor=teacher)
    new_c.save()
    
    logger.debug(f"*********** Course added: {title}")
    return Response({"data": f"{title} insert!"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_course(request):
    # 取得所有課程資料並回傳 JSON
    courses = Course.objects.all().values()
    return JsonResponse(list(courses), safe=False)