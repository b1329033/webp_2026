from django.urls import path
from . import views

urlpatterns = [
    # Post 路由
    path('add', views.add_post),
    path('list', views.list_post),
    
    # Course 路由 (作業用)
    path('addcourse', views.add_course),
    path('courselist', views.list_course),

    path('users', views.list_users, name='list_users'),
]