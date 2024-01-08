from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.

# Crear modelos de Paciente, Especialista, Cesfam
class Especialidad(models.Model):
    id_especialidad =  models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, verbose_name="Nombre de especialidad")

    class Meta:
        verbose_name_plural = "Especialidades"

    def __str__(self):
        return self.nombre


class Cesfam(models.Model):
    id_cesfam = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, verbose_name="Nombre de CESFAM")

    class Meta:
        verbose_name_plural = "Cesfams"

    def __str__(self):
        return self.nombre
    
class Profesional(models.Model):
    nombre = models.CharField(max_length=50, verbose_name="Nombre del profesional")
    apellido = models.CharField(max_length=50, verbose_name="Apellido del profesional")    
    especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Profesionales"

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
class Paciente(models.Model):
    username = models.CharField(max_length=15, verbose_name="Nombre de usuario")
    rut = models.CharField(
        max_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{7,8}[Kk0-9]$',
                message='Ingresa un RUT chileno válido sin dv (ej. 211409606).'
            ),
        ],
        unique=True,
        verbose_name="RUT"
    )
    profesionales_favoritos = models.ManyToManyField(Profesional, related_name='favoritos', blank=True)
    profesionales_bloqueados = models.ManyToManyField(Profesional, related_name='bloqueados', blank=True)

    def __str__(self):
        return self.username
    
class Reserva(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE) 
    profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE)
    fecha_atencion = models.DateField()
    hora_atencion = models.TimeField()
    fecha_solicitud_hora = models.DateField()
    grabacion = models.BooleanField(default=False)

    def __str__(self):
        return f"Reserva para {self.paciente}"

