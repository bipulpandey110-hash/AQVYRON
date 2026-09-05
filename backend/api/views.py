from django.db import InterfaceError, OperationalError, close_old_connections, connection
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ContactMessage, Project, Skill, Profile
from .serializers import (
    ContactMessageSerializer,
    ProjectSerializer,
    SkillSerializer,
    ProfileSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by("name")
    serializer_class = SkillSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by("-updated_at")
    serializer_class = ProfileSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by("-created_at")
    serializer_class = ContactMessageSerializer
    http_method_names = ["post", "head", "options"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Close stale database connections before handling the request.
        close_old_connections()

        try:
            # Force a fresh/valid database connection.
            connection.ensure_connection()

            # Save the contact message.
            message = serializer.save()

        except (OperationalError, InterfaceError) as exc:
            # Log the real database error in Render logs.
            print(
                "CONTACT DB ERROR (first attempt):",
                repr(exc),
                flush=True,
            )

            # Close the broken connection.
            close_old_connections()

            try:
                # Try once again with a fresh connection.
                connection.ensure_connection()
                message = serializer.save()

            except (OperationalError, InterfaceError) as exc2:
                # Log the second database error.
                print(
                    "CONTACT DB ERROR (second attempt):",
                    repr(exc2),
                    flush=True,
                )

                close_old_connections()

                return Response(
                    {
                        "success": False,
                        "detail": (
                            "Database connection is temporarily unavailable. "
                            "Please try again."
                        ),
                    },
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )

        return Response(
            {
                "success": True,
                "message": "Message sent successfully.",
                "id": message.id,
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["GET"])
def health(request):
    return Response(
        {
            "status": "ok",
            "service": "aqvyron-api",
        }
    )


@api_view(["GET"])
def analytics(request):
    return Response(
        {
            "growth": 18.4,
            "top_category": "Technology",
            "monthly_revenue": [
                {"month": "Jan", "value": 42000},
                {"month": "Feb", "value": 48000},
                {"month": "Mar", "value": 53000},
                {"month": "Apr", "value": 61000},
                {"month": "May", "value": 68000},
                {"month": "Jun", "value": 76000},
            ],
        }
    )


@api_view(["GET"])
def datasources(request):
    return Response(
        {
            "sources": [
                {
                    "name": "PostgreSQL",
                    "type": "DATABASE",
                    "status": "Connected",
                },
                {
                    "name": "CSV Data",
                    "type": "FILE",
                    "status": "Connected",
                },
                {
                    "name": "Excel Reports",
                    "type": "FILE",
                    "status": "Connected",
                },
            ]
        }
    )


@api_view(["GET"])
def insights(request):
    return Response(
        {
            "insights": [
                {
                    "title": "Revenue Growth",
                    "value": "+18.4%",
                    "description": (
                        "Revenue performance is showing a positive growth trend."
                    ),
                },
                {
                    "title": "Customer Activity",
                    "value": "24.8K",
                    "description": (
                        "Active users continue to interact with the platform."
                    ),
                },
                {
                    "title": "Conversion",
                    "value": "7.82%",
                    "description": (
                        "Current conversion performance remains healthy."
                    ),
                },
            ]
        }
    )