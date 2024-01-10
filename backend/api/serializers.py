from rest_framework import serializers
from chatbot.models import Profesional, Especialidad, Paciente, Reserva, Cesfam, Sector


class ReservaSerializer(serializers.ModelSerializer):
    paciente = serializers.ReadOnlyField(source='paciente.username')
    especialidad = serializers.ReadOnlyField(source='especialidad.nombre')
    profesional_nombre = serializers.ReadOnlyField(source='profesional.nombre')
    profesional_apellido = serializers.ReadOnlyField(source='profesional.apellido')


    class Meta:
        model = Reserva
        fields = ['id_reserva', 'paciente', 'especialidad', 'profesional_nombre', 'profesional_apellido', 'fecha_atencion', 'hora_atencion', 'fecha_solicitud_hora', 'grabacion']

class ProfesionalSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Profesional
        fields = "__all__"

    
    def get_especialidad_nombre(self, obj):
        return obj.especialidad.nombre if obj.especialidad else None

    

class PacienteSerializer(serializers.ModelSerializer):
    cesfam = serializers.StringRelatedField()
    sector = serializers.StringRelatedField()
    profesionales_favoritos = ProfesionalSerializer(many=True)
    profesionales_bloqueados = ProfesionalSerializer(many=True)

    class Meta:
        model = Paciente
        fields = ['id_paciente', 'username', 'rut', 'profesionales_favoritos', 'profesionales_bloqueados', 'cesfam', 'sector']

class CesfamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cesfam
        fields = ["id_cesfam", "nombre"]

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ["id_sector", "nombre"]


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = ["id_especialidad", "nombre"]

