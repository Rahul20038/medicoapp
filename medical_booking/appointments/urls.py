from django.urls import path
from .views import AppointmentCreateView, MyAppointmentsView

urlpatterns = [
    path('appointments/', AppointmentCreateView.as_view(), name='create-appointment'),
    path('my-appointments/', MyAppointmentsView.as_view(), name='my-appointments'),
]