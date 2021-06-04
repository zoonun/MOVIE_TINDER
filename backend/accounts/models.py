from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# Create def to resolve HINT: Use a callable instead, e.g., use `dict` instead of `{}`?
def genre_default():
    return {'12': 0, '14': 0, '16': 0, '18': 0, '27': 0, '28': 0, '35': 0, '36': 0, '37': 0, '53':0, '80': 0, '99':0, '878':0, '9648':0, '10402':0, '10749':0, '10751':0, '10752':0, '10770':0 }

class User(AbstractUser):
    genre_dict = models.JSONField(default=genre_default)

    # default 값이 이거라서 변하는게 없는 것.
    # def __str__(self):
    #     return self.username
