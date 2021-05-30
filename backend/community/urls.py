from django.urls import path
from . import views


app_name = 'community'

urlpatterns = [
    path('reviews/', views.review_create),
    path('reviews/<int:review_pk>/', views.review_update_delete),
    path('reviews/<int:review_pk>/comments/', views.comment_create),
    path('reviews/<int:review_pk>/rates', views.rate_create),
    path('rates/<int:rate_pk>/', views.rate_update_delete),
    path('comments/<int:comment_pk>/', views.comment_update_delete),
]