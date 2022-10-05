import graphene
from graphene_django import DjangoObjectType

from raisins.jobs.models import Department, Tag, Job
from raisins.candidates.models import Candidate

class DepartmentType(DjangoObjectType):
    class Meta:
        model = Department
        fields = ('id', 'name')

class TagType(DjangoObjectType):
    class Meta:
        model = Tag
        fields = ('id', 'name')

class JobType(DjangoObjectType):
    class Meta:
        model = Job
        fields = ('id', 'title', 'department', 'recruiter', 'hiring_manager', 'tags', 'description', 'requirements', 'country', 'city', 'street', 'zip_code', 'remote', 'employment_type', 'category', 'education', 'experience', 'min_hours', 'max_hours', 'min_salary', 'max_salary', 'resume', 'cover_letter', 'photo', 'phone', 'pipeline', 'candidate_set')


class Candidate(DjangoObjectType):
    class Meta:
        model = Candidate
        fields = ('id', 'name', 'surname', 'middlename', 'email', 'phone', 'jobs', 'address', 'salary_expectation', 'timezone')


class Query(graphene.ObjectType):
    all_jobs = graphene.List(JobType)
    all_candidates = graphene.List(Candidate)

    def resolve_all_jobs(root, info):
        return Job.objects.all()

    def resolve_all_candidates(root, info):
        return Candidate.objects.all()

schema = graphene.Schema(query=Query)
