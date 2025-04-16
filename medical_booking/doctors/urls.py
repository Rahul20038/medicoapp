from django.urls import path
from .views import DoctorListView, DoctorSlotView

urlpatterns = [
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('doctors/<int:pk>/slots/', DoctorSlotView.as_view(), name='doctor-slots'),
]