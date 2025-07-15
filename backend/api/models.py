from django.db import models


class Task(models.Model):

    id_task = models.AutoField(primary_key=True , auto_created=True)

    titolo = models.CharField(max_length=100)
    contenuto = models.CharField(max_length=255)

    stato = models.BooleanField(default=False)

    scadenza = models.DateField(auto_created=False , auto_now_add=False)


    def __str__(self,):

        return str(self.id_task) 
    


