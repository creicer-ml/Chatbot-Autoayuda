from django.urls import path
from .views import filtrar_paciente_por_rut, obtener_reservas_por_rut, listar_reservas, obtener_detalle_reserva, obtener_cesfams
urlpatterns = [
    path('filtrar_paciente/', filtrar_paciente_por_rut, name='filtrar_paciente_por_rut'),
    path('obtener_reservas/', obtener_reservas_por_rut, name='obtener_reservas_por_rut'),
    path('obtener_cesfams/', obtener_cesfams, name='obtener_cesfams'),
    path('listar_reservas/', listar_reservas, name='listar_reservas'),
    path('listar_reservas/<int:id_reserva>/', obtener_detalle_reserva, name='obtener_detalle_reserva'),
]
