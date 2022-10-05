import graphene
from graphene_django import DjangoObjectType

from raisins.jobs.models import Department, Tag, Job
from raisins.candidates.models import Candidate, CandidateJobStep

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



class CandidateJobStepType(DjangoObjectType):
    class Meta:
        model = CandidateJobStep
        field = ('candidate', 'job', 'step')


class CandidateType(DjangoObjectType):
    class Meta:
        model = Candidate
        fields = ('id', 'name', 'surname', 'middlename', 'email', 'phone', 'jobs', 'address', 'salary_expectation', 'timezone', 'steps')


class Query(graphene.ObjectType):
    all_jobs = graphene.List(JobType)
    all_candidates = graphene.List(CandidateType)
    job_by_id = graphene.Field(JobType, id=graphene.ID(required=True))

    def resolve_all_jobs(root, info):
        return Job.objects.all()

    def resolve_all_candidates(root, info):
        return Candidate.objects.all()

    def resolve_job_by_id(root, info, id):
        try:
            return Job.objects.get(id=id)
        except Job.DoesNotExist:
            return None

schema = graphene.Schema(query=Query)