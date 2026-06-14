class CapsulaUCI:
    def __init__(self, sensores, actuadores, comunicacion_wifi):
        self.estado_sistema = "Inactivo"
        self.wifi_conectado = False
        self.intervalo_lectura = 5
        self.sensores = sensores
        self.actuadores = actuadores
        self.comunicacion_wifi = comunicacion_wifi

    def iniciar(self):
        self.estado_sistema = "Activo"
        self.wifi_conectado = True
        print("Sistema UCI iniciado")

    def evaluar_condiciones(self):
        print("Evaluando condiciones de la planta...")

        datos = {}

        for sensor in self.sensores:
            valor = sensor.leer()
            datos[type(sensor).__name__] = valor

        self.comunicacion_wifi.enviar_datos(datos)
