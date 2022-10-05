from django.db import models
from django.contrib import admin
from raisins.jobs.models import Job


class Candidate(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    middlename = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=64)
    jobs = models.ManyToManyField(Job)
    address = models.CharField(max_length=255)
    salary_expectation = models.DecimalField(max_digits=32, decimal_places=2)
    timezone = models.CharField(max_length=16)
    resume = models.BinaryField()
    cover_letter = models.BinaryField()


admin.site.register(Candidate)
