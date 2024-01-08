from django.shortcuts import render
from chatbot.models import Paciente, Reserva
from .serializers import PacienteSerializer, ReservaSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

#Obtener reservas por RUT paciente
@api_view(['GET'])
def obtener_reservas_por_rut(request):
    rut = request.GET.get('rut', None)

    if rut is not None:
        try:
            paciente = Paciente.objects.get(rut=rut)
            reservas = Reserva.objects.filter(paciente=paciente)
            serializer = ReservaSerializer(reservas, many=True)
            return Response(serializer.data)
        except Paciente.DoesNotExist:
            return Response({'error': 'No se encontró ningún paciente con el rut proporcionado.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Parámetro de consulta "rut" no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)

#Listar reservas
@api_view(['GET'])
def listar_reservas(request):
    reservas = Reserva.objects.all()
    serializer = ReservaSerializer(reservas, many=True)
    return Response(serializer.data)

#Filtrar datos de paciente por RUT
@api_view(['GET'])
def filtrar_paciente_por_rut(request):
    rut = request.GET.get('rut', None)

    if rut is not None:
        pacientes = Paciente.objects.filter(rut=rut)
        serializer = PacienteSerializer(pacientes, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'Parámetro de consulta "rut" no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)
