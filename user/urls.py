from django.urls import path
from .views import registration, login
urlpatterns = [
    path('login/', login),
    path('registration/', registration)
]
