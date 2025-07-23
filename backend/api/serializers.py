from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Task , Documento
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password



class CambiaPasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required =  True)
    new_password = serializers.CharField(required = True)
    confirm_password = serializers.CharField(required = True)

    def validate(self , data):
        user = self.context['request'].user

        if not user.check_password(data['old_password']):
            raise serializers.ValidationError({'Messaggio' : 'la vecchia password non e valida'})
        
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({'Messaggio' : 'la nuova password non combacia alla conferma'})
        
        validate_password(data['new_password'] , user)
        return data
    

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()

        return user
    


class DocuemntoPostSerializer(serializers.ModelSerializer):

    class Meta:

        model = Documento
        fields = ['titolo','documento']


class DocumentoGetSerializer(serializers.ModelSerializer):

    class Meta:

        model = Documento

        fields = (
            'id_documento',
            'titolo',
            'documento'
        )

        read_only_fields = ['user']


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = ['username']



class TaskFindToShareSerializer(serializers.ModelSerializer):

    class Meta:

        model = User 

        fields = ['id','username']


class TaskInfoUserSerializer(serializers.ModelSerializer):

    class Meta: 

        model = User

        fields = ['username']



class TaskShardSerializer(serializers.ModelSerializer):

    user = TaskInfoUserSerializer()

    class Meta:

        model = Task

        fields = (
            'id_task',
            'titolo',
            'contenuto',
            'data_formattata',
            'stato',
            'shared',
            'user'
        )

        read_only_fields = ['user']

        def get_data_formattata(self,obj):
            return obj.scadenza.strftime("d%/m%/Y%")


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
            'scadenza',
            'shared'
        )
        
        read_only_fields = ['user']



class TaskSerializerDone(serializers.ModelSerializer):

    class Meta:

        model = Task
        fields = ['stato']
            
        

        read_only_fields=['user']

