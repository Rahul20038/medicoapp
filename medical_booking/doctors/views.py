from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.http import JsonResponse
from .models import Doctor
from .serializers import DoctorSerializer, DoctorSlotSerializer
from appointments.models import Appointment

@api_view(['GET'])
def get_doctors_by_category(request, category):
    doctors = Doctor.objects.filter(category__iexact=category)
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

