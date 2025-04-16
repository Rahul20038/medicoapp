from rest_framework import serializers
from .models import Appointment
from doctors.serializers import DoctorSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_details = DoctorSerializer(source='doctor', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'doctor_details', 'date', 'time_slot', 'created_at']
        read_only_fields = ['created_at']

    def validate(self, data):
        # Check if slot is available
        existing_appointment = Appointment.objects.filter(
            doctor=data['doctor'],
            date=data['date'],
            time_slot=data['time_slot']
        ).exists()

        if existing_appointment:
            raise serializers.ValidationError("This time slot is already booked.")

        # Check if max appointments per day is reached
        daily_appointments = Appointment.objects.filter(
            doctor=data['doctor'],
            date=data['date']
        ).count()

        if daily_appointments >= 7:
            raise serializers.ValidationError("Maximum appointments for this day have been reached.")

        return data