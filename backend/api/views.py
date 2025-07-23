from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes , parser_classes
from django.shortcuts import get_object_or_404
from .models import Task ,Documento
from .serializers import TaskSerialized , TaskToPostSerialized , TaskSerializerDone , TaskShardSerializer , TaskFindToShareSerializer ,UserSerializer , CambiaPasswordSerializer , DocuemntoPostSerializer , DocumentoGetSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth.models import User 
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse



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

        
#CHANGE PASSWORD

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



#DOCUMENT UPLOADING

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_document(request):

    if request.method == 'POST':

        serializer = DocuemntoPostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)

            return Response(serializer.data , status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)

 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_files(request):

    try : 

        doc = Documento.objects.filter(owner = request.user).order_by('data_caricamento')
        serializer = DocumentoGetSerializer(doc , many=True)

        return Response(serializer.data , status=status.HTTP_200_OK)

    except Documento.DoesNotExist:
        return Response({'Message' : 'documento non esiste'} , status=status.HTTP_400_BAD_REQUEST)
 
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download(request , id_documento):

    if request.method == 'GET':

        try : 
            doc = Documento.objects.get(owner = request.user , id_documento=id_documento)
            
            return FileResponse(doc.documento.open('rb'), as_attachment=True, filename=doc.documento.name)

        except Documento.DoesNotExist:
            
            return Response({'Message' : 'file non esiste'} , status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_document(request , id_documento):

    if request.method == 'DELETE':

        try:
            istance = get_object_or_404(Documento , id_documento=id_documento)
            istance.delete()

            return Response({'Message' : 'documento cancellato'} , status=status.HTTP_200_OK)

        except Documento.DoesNotExist:
            return Response({'Messaggio' : 'Nessun documento da cancellare'} , status=status.HTTP_400_BAD_REQUEST)
        