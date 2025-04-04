from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=200)  # The task name
    completed = models.BooleanField(default=False)  # Done or not

    def __str__(self):
        return self.title