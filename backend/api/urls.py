from django.urls import path
from .views import filtrar_paciente_por_rut, obtener_reservas_por_rut, listar_reservas

urlpatterns = [
    path('filtrar_paciente/', filtrar_paciente_por_rut, name='filtrar_paciente_por_rut'),
    path('obtener_reservas/', obtener_reservas_por_rut, name='obtener_reservas_por_rut'),
    path('listar_reservas/', listar_reservas, name='listar_reservas'),


]
