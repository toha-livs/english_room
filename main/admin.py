from django.contrib import admin
from .models import Word, CategoryWord, RelationWord


admin.site.register(CategoryWord)

admin.site.register(Word)

admin.site.register(RelationWord)