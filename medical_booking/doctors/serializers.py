from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialization', 'phone', 'is_available_for_call']

class DoctorSlotSerializer(serializers.Serializer):
    date = serializers.DateField()
    available_slots = serializers.ListField(child=serializers.TimeField())