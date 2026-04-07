from django.urls import path
from . import views

urlpatterns = [
    # 符合要求的網址: 127.0.0.1:8000/myhello/courselist
    path('courselist', views.list_course),
    
    # 符合要求的網址: 127.0.0.1:8000/myhello/addcourse
    path('addcourse', views.add_course),
    
    # 對應 http://127.0.0.1:8000/myhello/ex3
    path('ex3', views.ex3_view),
]