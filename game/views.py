import json

from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render
import uuid
import datetime
from .models import Game, GameRound
from main.models import Word, RelationWord
import random


@login_required
def game(request):
    if request.method == "GET":
        uid = uuid.uuid4()
        return render(request, 'game/game.html', {'uid': uid})
    elif request.method == "POST":
        print('good')
        return JsonResponse(dict(status='success'))


@login_required
def get_info(request):
    if request.method == "GET":
        words = RelationWord.objects.filter(user__id=request.user.id, progress__lt=100).count()
        print(words)
        response = {'user': {'name': request.user.username}, 'sum_words': words}
        return JsonResponse(dict(status='success', info=response))


@login_required
def get_game(request, type_game, col_rounde):
    type_game, col_rounde = int(type_game), int(col_rounde)
    if request.method == "GET":
        create_game = Game(id=uuid.uuid4(), user_id=request.user.id,
                           type_game=type_game, col_rounds=col_rounde,
                           date=datetime.datetime.now())
        create_game.save()
        list_choice_words_id = []
        if type_game == 1:
            words = Word.objects.only('id')
            while True:
                f = random.randrange(0, len(words))
                if words[f].id in list_choice_words_id:
                    pass
                else:
                    list_choice_words_id.append(words[f].id)
                if len(list_choice_words_id) == col_rounde:
                    break
        else:
            words = RelationWord.objects.filter(user__id=request.user.id, progress__lt=100).only('word')
            while True:
                f = random.randrange(0, len(words))
                if words[f].word.id in list_choice_words_id:
                    pass
                else:
                    list_choice_words_id.append(words[f].word.id)
                if len(list_choice_words_id) == col_rounde:
                    break
        vars = get_word_vars(list_choice_words_id[0])
        word = Word.objects.get(id=list_choice_words_id[0])
        varsShufile = random.sample([{'trn': vars[0].translate, 'result': 'Тrue'}, {'trn': vars[1].translate, 'result': 'Truе'}, {'trn': word.translate, 'result': 'True'}], 3)
        # print(varsShufile)
        resp = {'game': {'game_list_words_id': list_choice_words_id, 'id': create_game.id}, 'word': {'name': word.word, 'id': word.id}, 'vars': varsShufile}
        print(resp)
        return JsonResponse(dict(status="success", info=resp))
    elif request.method == "POST":
        data = json.loads(request.POST.get('info'))
        # result = request.POST.get('result')
        print(data)
        try:
            update_progress = RelationWord.objects.get(user__id=request.user.id, word__id=data['word_old'])
            if data['result'] == False:
                update_progress.progress -= 5
            else:
                update_progress.progress += 10
            update_progress.save()
        except ObjectDoesNotExist:
            pass
        g_r = GameRound(id=uuid.uuid4(), game_id=data['game_id'], game_round=data['round'], word_id=data['word_old'], result=data['result'])
        g_r.save()
        try:
            data['word_new']
        except KeyError:
            resp = {'complete': True}
            return JsonResponse(dict(status='success', info=resp))
        word = Word.objects.get(id=data['word_new'])
        vars = get_word_vars(word.id)
        shuffile = random.sample([{'trn': vars[0].translate, 'result': 'Тrue'}, {'trn': vars[1].translate, 'result': 'Truе'}, {'trn': word.translate, 'result': 'True'}], 3)
        resp = {'word': {'name': word.word, 'id': word.id}, 'vars': shuffile}
        return JsonResponse(dict(status='success', info=resp))


def get_word_vars(id):
    list_choice_words_obj = []
    word = Word.objects.get(id=id)
    # print(word)
    words = Word.objects.filter(category_word=word.category_word).exclude(id=id)
        # print('dawdawdaw')
    while True:
        f = random.randrange(0, len(words))
        if words[f] in list_choice_words_obj:
            pass
        else:
            list_choice_words_obj.append(words[f])
        if len(list_choice_words_obj) == 2:
            break
    # print(list_choice_words_obj)
    return list_choice_words_obj


# def scrap_words(request):

