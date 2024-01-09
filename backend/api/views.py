from django.shortcuts import render
from chatbot.models import Paciente, Reserva, Cesfam
from .serializers import PacienteSerializer, ReservaSerializer, CesfamSerializer
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

@api_view(['GET'])
def obtener_cesfams(request):
    cesfams = Cesfam.objects.all()
    serializer = CesfamSerializer(cesfams, many=True)
    return Response(serializer.data)

#Mostrar reserva específica
@api_view(['GET'])
def obtener_detalle_reserva(request, id_reserva):
    try:
        reserva = Reserva.objects.get(id_reserva=id_reserva)
        serializer = ReservaSerializer(reserva)
        return Response(serializer.data)
    except Reserva.DoesNotExist:
        return Response({'error': 'No se encontró ninguna reserva con el ID proporcionado.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def obtener_pacientes(request):
    pacientes = Paciente.objects.all()
    serializer = PacienteSerializer(pacientes, many=True)
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

@api_view(['PUT'])
def actualizar_cesfam_paciente(request, paciente_rut):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)

    cesfam_id_nuevo = request.data.get('cesfam_id', None)
    
    if cesfam_id_nuevo is not None:
        try:
            nuevo_cesfam = Cesfam.objects.get(pk=cesfam_id_nuevo)
        except Cesfam.DoesNotExist:
            return Response({'error': 'No se encontró el Cesfam.'}, status=status.HTTP_404_NOT_FOUND)

        paciente.cesfam = nuevo_cesfam
        paciente.save()

        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)
    else:
        return Response({'error': 'Parámetro "cesfam_id" no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)



