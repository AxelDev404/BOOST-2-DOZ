from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from django.shortcuts import get_object_or_404
from .models import Task
from .serializers import TaskSerialized , TaskToPostSerialized , TaskSerializerDone , TaskShardSerializer , TaskFindToShareSerializer ,UserSerializer , CambiaPasswordSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth.models import User



@api_view(['GET'])
def get_user_list(request):

    if request.method == 'GET':
        try :
            user = User.objects.all()
            serializer = TaskFindToShareSerializer(user , many=True)
            
            return Response(serializer.data , status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'Message' : 'nessun utente esistente per la condivisione'} , status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_todo(request):
    
    if request.method == 'GET':

        try: 
            tsk = Task.objects.filter(user=request.user).order_by('scadenza')
            serializer = TaskSerialized(tsk , many=True)

            return Response(serializer.data , status=status.HTTP_200_OK)   

        except Task.DoesNotExist:
            return Response({'Message' , 'non e stata creata nessuna task'} , status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shared_todo(request):
    
    user = request.user
    
    if request.method == 'GET':
        
        try:    
        
            task = Task.objects.filter(Q(shared=user)).order_by('scadenza')
            serializer = TaskShardSerializer(task , many=True)

            return Response(serializer.data , status=status.HTTP_200_OK)
        
        except Task.DoesNotExist:
            return Response({'Message' : 'nessuna task condivisa esiste nel database'} , status=status.HTTP_400_BAD_REQUEST)
 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_done_todo(request):

    if request.method == 'GET':
        try: 
            task = Task.objects.filter(user=request.user , stato=True).order_by('stato')
            serializer = TaskSerialized(task , many=True)

            return Response(serializer.data , status=status.HTTP_200_OK)
        
        except Task.DoesNotExist:
            return Response({'Messaggio' : 'nessuna task è stata ancora completata'} , status=status.HTTP_400_BAD_REQUEST)


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



#
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def patch_todo(request , id_task):

    if request.method == 'PATCH':

       istance = get_object_or_404(Task , id_task=id_task)
       serializer = TaskToPostSerialized(istance , data=request.data , partial=True)
       
       if serializer.is_valid():
           serializer.save()
           
           return Response(serializer.data , status=status.HTTP_202_ACCEPTED)
       else:
           return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def change_status_todo(request, id_task):

    if request.method == 'PATCH':

        istance_status = get_object_or_404(Task , id_task=id_task)
        serializer = TaskSerializerDone(istance_status , data=request.data , partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_202_ACCEPTED)
        
        else:
            return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_info(request):

    user = request.user

    if request.method == 'GET':

        return Response(
            {
                'username' : user.username , 
                'date_joined' : user.date_joined.strftime('%d/%m/%Y')
            } , status=status.HTTP_200_OK)

        

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def change_password(request):


    if request.method == 'PATCH':

        serializer = CambiaPasswordSerializer(data=request.data , context={'request' : request})

        if serializer.is_valid():
            serializer.save()
            return Response({'Messaggio' : 'password cambiata con successo'} , status=status.HTTP_200_OK)

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