from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, default='General')  # example: Cardio, General
    experience = models.PositiveIntegerField()
    qualification = models.CharField(max_length=200)
    rating = models.FloatField(default=0.0)
    address = models.CharField(max_length=100)
    def __str__(self):
        return self.name