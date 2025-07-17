from django.urls import path 
from . import views

urlpatterns = [
    path('tasks/' , views.get_todo , name='get_todo'),
    path('post_tsk/' , views.post_todo , name='post_todo'),
    path('delete_tks/<int:id_task>/', views.delete_todo , name='delete_todo'),
]