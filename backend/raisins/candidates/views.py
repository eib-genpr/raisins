from django.shortcuts import render
from rest_framework import viewsets
from .models import CandidateJobStep
from .serializers import CandidateJobStepSerializer

class CandidateJobStepViewSet(viewsets.ModelViewSet):
    queryset = CandidateJobStep.objects.all()
    serializer_class=CandidateJobStepSerializer
