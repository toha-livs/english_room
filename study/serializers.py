from rest_framework import serializers
from main.models import RelationWord


class RelationWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelationWord
        fields = '__all__'