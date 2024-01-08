from rest_framework import serializers
from chatbot.models import Profesional, Paciente

class ProfesionalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profesional
        fields = "__all__"

class PacienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paciente
        fields = "__all__"