from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse
from main.models import RelationWord


@login_required
def study(request):
    if request.method == 'GET':
        words = RelationWord.objects.filter(user__id=request.user.id)
        return render(request, 'study/study.html', {'words': words})


@login_required
def get_relations(request):
    if request.method == "POST":
        print(request.POST.get('id'))
        relat_word = RelationWord.objects.get(id=int(request.POST.get('id'))).delete()
        return JsonResponse(dict(status='success'))
    elif request.method == "GET":
        words = RelationWord.objects.filter(user__id=request.user.id)
        respons = {'words': [], 'user': {'name': request.user.username}}
        for i in words:
            if i.progress == None:
                i.progress = 0
            respons['words'].append({'word': i.word.word, 'translate': i.word.translate, 'progress': i.progress, 'id': i.id})
        print(respons)
        return JsonResponse({'status': 'success', 'info': respons})