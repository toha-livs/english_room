from django.urls import path
from .views import study, get_relations
from django.views.generic import TemplateView


urlpatterns = [
    path('', TemplateView.as_view(template_name="study/study.html")),
    # path('', study, name='study'),
    path('get-relations/', get_relations, name='get-relations'),
]