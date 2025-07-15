from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Task


class TaskSerialized(serializers.ModelSerializer):

    class Meta:

        model = Task

        fields = (
            'titolo',
            'contenuto',
            'scadenza',
            'user'
        )





