from django.contrib.auth.models import User
from django.db import models
from main.models import RelationWord, Word


class Game(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type_game = models.IntegerField()
    col_rounds = models.IntegerField(null=True)
    result = models.IntegerField(null=True)
    date = models.DateTimeField()


class GameRound(models.Model):
    id = models.UUIDField(primary_key=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    game_round = models.IntegerField()
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    result = models.BooleanField(default=False)

