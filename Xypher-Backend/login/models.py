from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.TextChoices):
    PRESETTLEMENT = 'PRESETTLEMENT'
    INSETTLEMENT = 'INSETTLEMENT'
    POSTSETTLEMENT = 'POSTSETTLEMENT'

class User(AbstractUser):
    role = models.CharField(max_length=255, choices=Role.choices, default=Role.PRESETTLEMENT)

# Create your models here.
