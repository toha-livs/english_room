from django.db import models
from django.contrib.auth.models import User


class CategoryWord(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self):
        return '{}'.format(self.name)


class Word(models.Model):
    word = models.CharField(max_length=40)
    translate = models.CharField(max_length=60)
    descriptions = models.CharField(max_length=300, null=True)
    category_word = models.ForeignKey(CategoryWord, on_delete=models.CASCADE)
    audio = models.FileField(upload_to="audio/", null=True, blank=True)

    def __str__(self):
        return 'слово:{} из категории {}'.format(self.word, self.category_word)


class RelationWord(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uniq = models.CharField(max_length=500, unique=True, null=True)
    progress = models.IntegerField(null=True, default=0)

    def __str__(self):
        return 'word {} from {}'.format(self.word, self.user)


class UserVerificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.UUIDField()
