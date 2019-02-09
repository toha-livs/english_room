from rest_framework import viewsets
from .serializers import RelationWordSerializer
from main.models import RelationWord


class RelationWordViewSet(viewsets.ModelViewSet):
    queryset = RelationWord.objects.all()
    serializer_class = RelationWordSerializer