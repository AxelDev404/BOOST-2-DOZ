from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):

    id_task = models.AutoField(primary_key=True , auto_created=True)

    titolo = models.CharField(max_length=100)
    contenuto = models.CharField(max_length=255)

    stato = models.BooleanField(default=False)

    scadenza = models.DateField(auto_created=False , auto_now_add=False)

    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='task')

    shared = models.ForeignKey(User, on_delete=models.CASCADE, null=True , blank=True , related_name='tasks')

    def data_formattata(self,):
        return self.scadenza.strftime("%d/%m/%Y")

    def __str__(self,):

        return str(self.id_task) 
    

