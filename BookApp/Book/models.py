from django.db import models

# Create your models here.

class Book(models.Model):
    name = models.CharField(max_length=60)
    author = models.CharField(max_length=50)
    isbn = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
