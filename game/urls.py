from django.urls import path
from .views import game, get_info, get_game

urlpatterns = [
    path('', game, name='game'),
    path('get-info/', get_info, name='get_info'),
    path('get-game/<int:type_game>/<int:col_rounde>/', get_game, name='get_info'),
]