from rest_framework import serializers
from .models import CandidateJobStep


class CandidateJobStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateJobStep
        fields = '__all__'
