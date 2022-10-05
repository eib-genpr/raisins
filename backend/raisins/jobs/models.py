from django.db import models
from django.conf import settings
from django_countries.fields import CountryField
from jsonfield import JSONField

class Tags(models.Model):
    name = models.CharField(max_length=255)

class Department(models.Model):
    name = models.CharField(max_length=255)

class Job(models.Model):
    class EmploymentType(models.TextChoices):
        FULL_TIME = 'FT', 'Full-time'
        PART_TIME = 'PT', 'Part-time'
        TEMPORARY = 'TM', 'Temporary'
        CONTRACT = 'CT', 'Contract'
        INTERNSHIP = 'IT', 'Internship'
        SEASIONAL = 'SS', 'Seasonsal'
        VOLUNTEER = 'VT', 'Volunteer'

    class Category(models.TextChoices):
        ACCOUNTING = 'AT', 'Accounting'
        ADMINISTRATIVE_AND_CLERICAL = 'AC', 'Administration and Clerical'
        # TODO

    class Education(models.TextChoices):
        HIGH_SCHOOL_COURSEWORK = 'HC', 'High school coursework'
        HIGH_SCHOOL = 'HS', 'High school or equivalent'
        # TODO

    class Experience(models.TextChoices):
        STUDENT_HIGH_SCHOOL = 'HS', 'Student (High school)'
        STUDENT_COLLEGE = 'CL', 'Studnet (College)'
        # TODO

    class RequirementType(models.TextChoices):
        REQUIRED = 'R', 'Required'
        OPTIONAL = 'O', 'Optional'
        HIDDEN = 'H', 'Hidden'

    title = models.CharField(max_length=255)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL)
    recruiter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL)
    hiring_manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL)
    tags = models.ManyToManyField(Tags)
    description = models.CharField(max_length=20000)
    requirements = models.CharField(max_length=20000)
    country = CountryField()
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=128)
    remote = models.BooleanField()
    employment_type = models.CharField(max_length=2, choices=EmploymentType.choices)
    category = models.CharField(max_length=2, choices=Category.choices)
    education = models.CharField(max_length=2, choices=Education.choices)
    experience = models.CharField(max_length=2, choices=Experience.choices)
    min_hours = models.IntegerField()
    max_hours = models.IntegerField()
    min_salary = models.DecimalField()
    max_salary = models.DecimalField()
    #salary_period = models.CharField(max_length=2, choices=SalaryPeriod.choices)
    # currency =
    resume = models.CharField(max_length=1, choices=RequirementType.choices)
    cover_letter = models.CharField(max_length=1, choices=RequirementType.choices)
    photo = models.CharField(max_length=1, choices=RequirementType.choices)
    phone = models.CharField(max_lenght=1, choices=RequirementType.choices)
    pipeline = JSONField()


