from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from django.shortcuts import get_object_or_404
from .models import Task
from .serializers import TaskSerialized , TaskToPostSerialized
from rest_framework.permissions import IsAuthenticated



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_todo(request):

    if request.method == 'GET':

        try: 
            tsk = Task.objects.filter(user=request.user)
            serializer = TaskSerialized(tsk , many=True)

            return Response(serializer.data , status=status.HTTP_200_OK)   

        except Task.DoesNotExist:
            return Response({'Message' , 'non e stata creata nessuna task'} , status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_todo(request):

    if request.method == 'POST':

        serializer = TaskToPostSerialized(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data , status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST) 



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_todo(request , id_task):

    if request.method == 'DELETE':

        try:
            istance = get_object_or_404(Task , id_task=id_task)
        
            istance.delete()
        
            return Response({'Message' : 'Task cancellata dalla base dati'} , status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response({'Message' : 'Nessuna task trovata per questo id'} , status=status.HTTP_400_BAD_REQUEST)



""""
    JSON PER TESTING
    {
        "titolo": "Completa il report",
        "contenuto": "Scrivere il report settimanale per il progetto X",
        "scadenza": "2025-07-20",
        "user": 1
    }
"""""