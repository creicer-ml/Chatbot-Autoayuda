import json
from django.http import JsonResponse
from django.shortcuts import render
from chatbot.models import Paciente, Reserva, Cesfam, Sector, Profesional, Especialidad
from .serializers import PacienteSerializer, ProfesionalSerializer, ReservaSerializer, CesfamSerializer, SectorSerializer, EspecialidadSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404

def login_view(request):
   if request.method == 'POST':
       data = json.loads(request.body)
       username = data.get('username')
       password = data.get('password')
       user = authenticate(request, username=username, password=password)

       if user is not None:
           login(request, user)
           return JsonResponse({'message': 'Inicio de sesiòn exitoso'})
       else:
           return JsonResponse({'message': 'Credenciales inválidas'}, status=401)
   else:
       return JsonResponse({'message': 'Método inválido'}, status=405)

def logout_view(request):
   logout(request)
   return JsonResponse({'message': 'Has cerrado sesión'})

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})
        
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

@api_view(['GET'])
def obtener_profesionales(request):
    profesionales = Profesional.objects.all()
    serializer = ProfesionalSerializer(profesionales, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def obtener_cesfams(request):
    cesfams = Cesfam.objects.all()
    serializer = CesfamSerializer(cesfams, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def obtener_sectores(request):
    sectores = Sector.objects.all()
    serializer = SectorSerializer(sectores, many=True)
    return Response(serializer.data)

#Listar reservas
@api_view(['GET'])
def listar_reservas(request):
    reservas = Reserva.objects.all()
    serializer = ReservaSerializer(reservas, many=True)
    return Response(serializer.data)

#Listar reservas
@api_view(['GET'])
def obtener_especialidades(request):
    especialidades = Especialidad.objects.all()
    serializer = EspecialidadSerializer(especialidades, many=True)
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
def modificar_rut(request, paciente_rut):
    nuevo_rut = request.data.get('nuevoRut', None)

    if nuevo_rut is not None:
        paciente = get_object_or_404(Paciente, rut=paciente_rut)
        paciente.rut = nuevo_rut
        paciente.save()

        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)
    
    else:
        return Response({'error': 'Parámetro "nuevoRut" no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def mostrar_profesionales_favoritos(request, paciente_rut):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
        profesionales_favoritos = paciente.profesionales_favoritos.all()
        serializer = ProfesionalSerializer(profesionales_favoritos, many=True)
        return Response(serializer.data)
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def agregar_profesional_favorito(request, paciente_rut, id_profesional):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
        profesional = Profesional.objects.get(pk=id_profesional)

        paciente.profesionales_favoritos.add(profesional)
        paciente.save()

        return Response({'message': 'Profesional favorito agregado correctamente.'})
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)
    except Profesional.DoesNotExist:
        return Response({'error': 'No se encontró el profesional.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def eliminar_profesional_favorito(request, paciente_rut, id_profesional):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        profesional_favorito = Profesional.objects.get(id_profesional=id_profesional)
    except Profesional.DoesNotExist:
        return Response({'error': 'Profesional favorito no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    paciente.profesionales_favoritos.remove(profesional_favorito)
    return Response({'mensaje': 'Profesional favorito eliminado correctamente.'})



@api_view(['GET'])
def mostrar_profesionales_bloqueados(request, paciente_rut):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
        profesionales_bloqueados = paciente.profesionales_bloqueados.all()
        serializer = ProfesionalSerializer(profesionales_bloqueados, many=True)
        return Response(serializer.data)
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def bloquear_profesional(request, paciente_rut, id_profesional):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
        profesional = Profesional.objects.get(pk=id_profesional)

        paciente.profesionales_bloqueados.add(profesional)
        paciente.save()

        return Response({'message': 'Profesional bloqueado agregado correctamente.'})
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)
    except Profesional.DoesNotExist:
        return Response({'error': 'No se encontró el profesional.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def eliminar_profesional_bloqueado(request, paciente_rut, id_profesional):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        profesional_bloqueado = Profesional.objects.get(id_profesional=id_profesional)
    except Profesional.DoesNotExist:
        return Response({'error': 'Profesional bloqueado no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    paciente.profesionales_bloqueados.remove(profesional_bloqueado)
    return Response({'mensaje': 'Profesional bloqueado eliminado correctamente.'})

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
    
@api_view(['PUT'])
def actualizar_sector_paciente(request, paciente_rut):
    try:
        paciente = Paciente.objects.get(rut=paciente_rut)
    except Paciente.DoesNotExist:
        return Response({'error': 'No se encontró el paciente.'}, status=status.HTTP_404_NOT_FOUND)

    sector_id_nuevo = request.data.get('sector_id', None)
    
    if sector_id_nuevo is not None:
        try:
            nuevo_sector = Sector.objects.get(pk=sector_id_nuevo)
        except Sector.DoesNotExist:
            return Response({'error': 'No se encontró el Cesfam.'}, status=status.HTTP_404_NOT_FOUND)

        paciente.sector = nuevo_sector
        paciente.save()

        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)
    else:
        return Response({'error': 'Parámetro "cesfam_id" no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)



