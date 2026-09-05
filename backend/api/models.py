from django.db import models


class DataSource(models.Model):
    name = models.CharField(max_length=120)
    source_type = models.CharField(max_length=80)
    status = models.CharField(max_length=40, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    technologies = models.CharField(max_length=250)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    level = models.PositiveIntegerField(default=80)
    featured = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Profile(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=150)
    bio = models.TextField()
    email = models.EmailField()
    location = models.CharField(max_length=150, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    resume_url = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"