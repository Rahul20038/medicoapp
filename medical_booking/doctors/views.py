from rest_framework import generics, permissions
from rest_framework.response import Response
from datetime import datetime, timedelta
from .models import Doctor
from .serializers import DoctorSerializer, DoctorSlotSerializer
from appointments.models import Appointment

class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]

class DoctorSlotView(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSlotSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        doctor = self.get_object()
        date_param = request.query_params.get('date')
        
        try:
            selected_date = datetime.strptime(date_param, '%Y-%m-%d').date()
        except (TypeError, ValueError):
            return Response({'error': 'Invalid date format'}, status=400)

        # Generate all possible slots (9 AM to 5 PM)
        all_slots = [
            datetime.strptime(f'09:{i:02d}', '%H:%M').time()
            for i in range(0, 60, 60)  # Hourly slots
        ]

        # Get booked slots
        booked_slots = Appointment.objects.filter(
            doctor=doctor,
            date=selected_date
        ).values_list('time_slot', flat=True)

        # Filter out booked slots
        available_slots = [
            slot for slot in all_slots
            if slot not in booked_slots
        ][:7]  # Limit to 7 slots per day

        return Response({
            'date': selected_date,
            'available_slots': available_slots
        })