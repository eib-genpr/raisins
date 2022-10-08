from django.shortcuts import render
from rest_framework import viewsets
from .models import CandidateJobStep, Candidate
from .serializers import CandidateJobStepSerializer, CandidateSerializer


class CandidateJobStepViewSet(viewsets.ModelViewSet):
    queryset = CandidateJobStep.objects.all()
    serializer_class = CandidateJobStepSerializer


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
