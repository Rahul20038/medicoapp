from django.urls import path
from . import views

urlpatterns = [
    path('doctors/<str:category>/', views.get_doctors_by_category),
]