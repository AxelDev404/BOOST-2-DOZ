from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Task
from .serializers import TaskSerialized


@api_view(['GET'])
def get_todo(request):

    if request.method == 'GET':

        try: 
            tsk = Task.objects.all()
            serializer = TaskSerialized(tsk , many=True)

            return Response(serializer.data , status=status.HTTP_200_OK)   

        except Task.DoesNotExist:
            return Response({'Message' , 'non e stata creata nessuna task'} , status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def post_todo(request):

    if request.method == 'POST':

        serializer = TaskSerialized(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST) 




""""

    JSON PER TESTING

    {
        "titolo": "Completa il report",
        "contenuto": "Scrivere il report settimanale per il progetto X",
        "scadenza": "2025-07-20",
        "user": 1
    }
"""""