from django.db import models

class Course(models.Model):
    Department = models.CharField(max_length=100)
    CourseTitle = models.CharField(max_length=100)
    Instructor = models.CharField(max_length=100)

    def __str__(self):
        return self.CourseTitle