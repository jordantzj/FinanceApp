from django.db import models
from sqlalchemy import true

# Create your models here.
class Stocks(models.Model):
    ticker = models.CharField(max_length=200, default=000)
    name = models.CharField(max_length=200)
    amount = models.CharField(max_length=200)
    mark = models.CharField(max_length=200)

    def __str__(self):
        return self.ticker