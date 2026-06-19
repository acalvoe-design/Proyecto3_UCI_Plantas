from class_Sensor import Sensor


class SensorLuz(Sensor):
    def __init__(self, pin, umbral_min, umbral_max, lux=0):
        super().__init__(pin, umbral_min, umbral_max)
        self.lux = lux

    def leer(self):
        print("Leyendo intensidad lumínica...")
        return self.valor_actual
