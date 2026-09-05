from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def home(request):
    return JsonResponse({
        "name": "AQVYRON",
        "status": "online",
        "service": "Intelligent Business Intelligence & Data Analytics System",
    })


urlpatterns = [
    path("", home, name="home"),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]
