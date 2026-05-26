from django.urls import path
from .views import HomeView

urlpatterns = [
    # Define your URL patterns here
    path("", HomeView, name="home"),
]