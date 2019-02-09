from django.urls import path
from .views import get_relations, study
from django.views.generic import TemplateView


urlpatterns = [
    path('', study, name='study'),
    path('get-relations/', get_relations, name='get-relations'),
]