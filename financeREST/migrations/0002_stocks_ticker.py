# Generated by Django 3.2.7 on 2022-02-09 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('financeREST', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='stocks',
            name='ticker',
            field=models.CharField(default=0, max_length=200),
        ),
    ]
