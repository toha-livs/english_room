import logging

from django.core.mail import EmailMessage
from celery import shared_task
from main.models import UserVerificate
from django.core.exceptions import ObjectDoesNotExist


@shared_task
def send_verification_email(user_id):
    try:
        vrif = UserVerificate.objects.get(user__id=user_id)
        email = EmailMessage('привет <a href="http://localhost:8000/verificate/{}/">переходи по ссылке</a>'.format(vrif.url), to=[vrif.user.email])
        email.send()
    except ObjectDoesNotExist:
        logging.warning("Tried to send verification email to non-existing user {}".format(user_id))