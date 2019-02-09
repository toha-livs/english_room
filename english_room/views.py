import uuid
import time
from django.contrib.auth.models import User
from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from main.models import UserVerificate, Word
from django.core.exceptions import ObjectDoesNotExist


def start(request):
    return render(request, 'english_room/start.html')


def auth(request):
    if request.method == "GET":
        return render(request, 'english_room/auth.html')
    elif request.method == "POST" and request.is_ajax():
        logn = request.POST.get('login')
        password = request.POST.get('password')
        user = authenticate(username=logn, password=password)
        if user is not None:
            login(request, user)
            return redirect('start')
        else:
            raise Http404


def logout_from(request):
    logout(request)
    return redirect('auth')


def sign_up(request):
    if request.method == "GET":
        return render(request, 'english_room/signup.html')
    elif request.method == "POST" and request.is_ajax():
        logn = request.POST.get('login')
        password = request.POST.get('password')
        try:
            user = User.objects.get(username=logn)
        except ObjectDoesNotExist:
            user = User.objects.create_user(logn, 'aghica@bk.ru', password)
            user.save()
            if user is not None:
                login(request, user)
                return redirect('start')
            return redirect('start')
        raise Http404


def test(requeest):
    user = requeest.user.id
    words = Word.objects.only('id')
    for i in words:
        print(i.id)
    return HttpResponse({'status': 'success'})