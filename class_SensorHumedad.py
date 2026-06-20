from class_Sensor import Sensor


class SensorHumedad(Sensor):
    def __init__(self, pin, umbral_min, umbral_max, tipo="DHT22"):
        super().__init__(pin, umbral_min, umbral_max)
        self.tipo = tipo

    def leer(self):
        print("Leyendo humedad...")
        return self.valor_actual
