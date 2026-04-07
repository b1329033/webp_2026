from django.contrib import admin
from .models import Course

admin.site.register(Course)
# 移除原本的 admin.site.register(User) 或 Post