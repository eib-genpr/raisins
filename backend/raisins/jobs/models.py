from django.db import models
from django.contrib import admin
from django.conf import settings
from django_countries.fields import CountryField


class Tag(models.Model):
    name = models.CharField(max_length=255)


admin.site.register(Tag)


class Department(models.Model):
    name = models.CharField(max_length=255)


admin.site.register(Department)


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
    department = models.ForeignKey(Department, null=True, blank=True, on_delete=models.SET_NULL)
    recruiter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='recruiter', null=True, blank=True)
    hiring_manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='hiring_manager', null=True, blank=True)
    tags = models.ManyToManyField(Tag)
    description = models.CharField(max_length=20000, null=True, blank=True)
    requirements = models.CharField(max_length=20000, null=True, blank=True)
    country = CountryField(null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    street = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=128, null=True, blank=True)
    remote = models.BooleanField(null=True, blank=True)
    employment_type = models.CharField(max_length=2, choices=EmploymentType.choices, null=True, blank=True)
    category = models.CharField(max_length=2, choices=Category.choices, null=True, blank=True)
    education = models.CharField(max_length=2, choices=Education.choices, null=True, blank=True)
    experience = models.CharField(max_length=2, choices=Experience.choices, null=True, blank=True)
    min_hours = models.IntegerField(null=True, blank=True)
    max_hours = models.IntegerField(null=True, blank=True)
    min_salary = models.DecimalField(decimal_places=2, max_digits=16, null=True, blank=True)
    max_salary = models.DecimalField(decimal_places=2, max_digits=16, null=True, blank=True)
    #salary_period = models.CharField(max_length=2, choices=SalaryPeriod.choices)
    # currency =
    resume = models.CharField(max_length=1, choices=RequirementType.choices, null=True, blank=True)
    cover_letter = models.CharField(max_length=1, choices=RequirementType.choices, null=True, blank=True)
    photo = models.CharField(max_length=1, choices=RequirementType.choices, null=True, blank=True)
    phone = models.CharField(max_length=1, choices=RequirementType.choices, null=True, blank=True)
    pipeline = models.JSONField(null=True, blank=True)


admin.site.register(Job)
