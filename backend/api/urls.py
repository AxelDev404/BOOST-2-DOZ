from django.urls import path 
from . import views

urlpatterns = [
    path('tasks/' , views.get_todo , name='get_todo'),
    path('post_tsk/' , views.post_todo , name='post_todo'),
    path('delete_tks/<int:id_task>/', views.delete_todo , name='delete_todo'),
    path('patch_tsk/<int:id_task>/' , views.patch_todo , name='patch_todo'),
    path('change_status_task/<int:id_task>/' , views.change_status_todo , name='change_status_task'),
    path('shared_tsk/' , views.get_shared_todo , name='get_shared_todo'),
    path('done_tsk/' , views.get_done_todo , name='get_shared_todo'),
    path('user_list/' , views.get_user_list , name='get_user_list'),
    path('myprofile/' , views.get_my_info , name='get_my_info'),
]