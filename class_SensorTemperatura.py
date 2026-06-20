from class_Sensor import Sensor


class SensorTemperatura(Sensor):
    def __init__(self, pin, umbral_min, umbral_max, unidad="°C"):
        super().__init__(pin, umbral_min, umbral_max)
        self.unidad = unidad

    def leer(self):
        print("Leyendo temperatura...")
        return self.valor_actual
