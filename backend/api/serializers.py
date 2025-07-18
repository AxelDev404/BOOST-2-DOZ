from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Task


class TaskSerialized(serializers.ModelSerializer):

    class Meta:

        model = Task

        fields = (
            'id_task',
            'titolo',
            'contenuto',
            'stato',
            'data_formattata'   
        )

        read_only_fields = ['user']

    def get_data_formattata(self, obj):
        return obj.scadenza.strftime("d%/m%/Y%")
    


class TaskToPostSerialized(serializers.ModelSerializer):

    class Meta:

        model = Task
        fields = (
            'titolo',
            'contenuto',
            'scadenza'
        )
        
        read_only_fields = ['user']



class TaskSerializerDone(serializers.ModelSerializer):

    class Meta:

        model = Task
        fields = ['stato']
            
        

        read_only_fields=['user']

