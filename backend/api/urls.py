from django.urls import path
from .views import filtrar_paciente_por_rut

urlpatterns = [
    path('filtrar_paciente/', filtrar_paciente_por_rut, name='filtrar_paciente_por_rut'),
]
