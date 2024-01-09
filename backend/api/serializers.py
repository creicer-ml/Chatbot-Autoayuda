from rest_framework import serializers
from chatbot.models import Profesional, Paciente, Reserva, Cesfam


class ReservaSerializer(serializers.ModelSerializer):
    paciente = serializers.ReadOnlyField(source='paciente.username')
    especialidad = serializers.ReadOnlyField(source='especialidad.nombre')
    profesional_nombre = serializers.ReadOnlyField(source='profesional.nombre')
    profesional_apellido = serializers.ReadOnlyField(source='profesional.apellido')


    class Meta:
        model = Reserva
        fields = ['id_reserva', 'paciente', 'especialidad', 'profesional_nombre', 'profesional_apellido', 'fecha_atencion', 'hora_atencion', 'fecha_solicitud_hora', 'grabacion']

class ProfesionalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profesional
        fields = "__all__"

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['id', 'username', 'rut', 'profesionales_favoritos', 'profesionales_bloqueados']

class CesfamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cesfam
        fields = ["id_cesfam", "nombre"]