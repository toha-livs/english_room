# -*- coding: utf-8 -*-
import json
import uuid

from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, Http404
from django.shortcuts import render
from .models import Word, CategoryWord, RelationWord
from django.contrib.auth.decorators import login_required


@login_required
def add_word(request):
    if request.method == "GET":
        category = CategoryWord.objects.all()
        return render(request, 'main/add_word.html', {'category': category})


@login_required
def search_word(request):
    if request.method == "POST":
        data = json.loads(request.POST.get('data'))
        print(data)
        words = Word.objects.filter(word__icontains=data['word'])[:5]
        word_s = []
        for i in words:
            word_s.append({'word': i.word, 'id': i.id})
        return JsonResponse(dict(status='success', info=word_s))
    elif request.method == "GET":
        resp = {'user': {'name': request.user.username}}
        return JsonResponse(dict(status='success', info=resp))


@login_required
def add_to_store(request, word_id):
    if request.method == 'GET':
        try:
            RelationWord.objects.get(user__id=request.user.id, word__id=word_id)
        except ObjectDoesNotExist:
            add_word = RelationWord(user_id=request.user.id, word_id=word_id, uniq='{}_{}'.format(word_id, request.user.id))
            add_word.save()
            return JsonResponse({'status': 'success'})
        raise Http404
    elif request.method == "POST":
        word = request.POST.get('word')
        word = word.lower()
        try:
            word = Word.objects.get(word=word)
        except ObjectDoesNotExist:
            try:
                descr = request.POST.get('descr')
            except:
                descr = 'none'
            category = request.POST.get('category')
            trl = request.POST.get('trl')
            word_add =  Word(word=word, translate=trl, descriptions=descr, category_word_id=category)
            word_add.save()
            return JsonResponse({'status': 'success'})
        raise Http404

