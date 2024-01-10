# Generated by Django 4.2.8 on 2024-01-10 11:31

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cesfam',
            fields=[
                ('id_cesfam', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100, verbose_name='Nombre de CESFAM')),
            ],
            options={
                'verbose_name_plural': 'Cesfams',
            },
        ),
        migrations.CreateModel(
            name='Especialidad',
            fields=[
                ('id_especialidad', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100, verbose_name='Nombre de especialidad')),
            ],
            options={
                'verbose_name_plural': 'Especialidades',
            },
        ),
        migrations.CreateModel(
            name='Funcionario',
            fields=[
                ('id_funcionario', models.BigAutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50, verbose_name='Nombre de usuario del profesional')),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre del profesional')),
                ('apellido', models.CharField(max_length=50, verbose_name='Apellido del profesional')),
            ],
            options={
                'verbose_name_plural': 'Funcionarios',
            },
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id_paciente', models.BigAutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=15, verbose_name='Nombre de usuario')),
                ('rut', models.CharField(max_length=10, unique=True, validators=[django.core.validators.RegexValidator(message='Ingresa un RUT chileno válido sin dv (ej. 211409606).', regex='^\\d{7,8}[Kk0-9]$')], verbose_name='RUT')),
                ('cesfam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chatbot.cesfam')),
            ],
        ),
        migrations.CreateModel(
            name='Profesional',
            fields=[
                ('id_profesional', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre del profesional')),
                ('apellido', models.CharField(max_length=50, verbose_name='Apellido del profesional')),
                ('especialidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chatbot.especialidad')),
            ],
            options={
                'verbose_name_plural': 'Profesionales',
            },
        ),
        migrations.CreateModel(
            name='Sector',
            fields=[
                ('id_sector', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100, verbose_name='Nombre del sector')),
            ],
            options={
                'verbose_name_plural': 'Sectores',
            },
        ),
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id_reserva', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_atencion', models.DateField()),
                ('hora_atencion', models.TimeField()),
                ('fecha_solicitud_hora', models.DateField()),
                ('grabacion', models.BooleanField(default=False)),
                ('especialidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chatbot.especialidad')),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chatbot.paciente')),
                ('profesional', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chatbot.profesional')),
            ],
        ),
        migrations.AddField(
            model_name='paciente',
            name='profesionales_bloqueados',
            field=models.ManyToManyField(blank=True, related_name='bloqueados', to='chatbot.profesional'),
        ),
        migrations.AddField(
            model_name='paciente',
            name='profesionales_favoritos',
            field=models.ManyToManyField(blank=True, related_name='favoritos', to='chatbot.profesional'),
        ),
        migrations.AddField(
            model_name='paciente',
            name='sector',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chatbot.sector'),
        ),
    ]
