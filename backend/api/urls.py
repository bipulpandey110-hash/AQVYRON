from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    SkillViewSet,
    ProfileViewSet,
    ContactMessageViewSet,
    analytics,
    datasources,
    insights,
    health,
)

router = DefaultRouter()

router.register("projects", ProjectViewSet, basename="project")
router.register("skills", SkillViewSet, basename="skill")
router.register("profile", ProfileViewSet, basename="profile")
router.register("contact", ContactMessageViewSet, basename="contact")

urlpatterns = [
    path("health/", health, name="health"),
    path("analytics/", analytics, name="analytics"),
    path("datasources/", datasources, name="datasources"),
    path("insights/", insights, name="insights"),
]

urlpatterns += router.urls
