from django.db import models
from django.conf import settings

class Appointment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor = models.ForeignKey('doctors.Doctor', on_delete=models.CASCADE)
    date = models.DateField()
    time_slot = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['doctor', 'date', 'time_slot']
        
    def __str__(self):
        return f"{self.user.username} - {self.doctor.name} - {self.date} {self.time_slot}"