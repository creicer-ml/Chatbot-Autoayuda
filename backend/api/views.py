from django.shortcuts import render
from chatbot.models import Paciente
from .serializers import PacienteSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view



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
