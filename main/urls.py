from django.urls import path
from .views import add_word, search_word, add_to_store


urlpatterns = [
    path('', add_word, name='add-word'),
    path('get-info/', search_word, name='get-info'),
    path('search-word/', search_word, name='search-word'),
    path('add-to-my/<str:word_id>/', add_to_store, name='word_user'),
]