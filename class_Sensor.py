class Sensor:
    def __init__(self, pin, umbral_min, umbral_max):
        self.pin = pin
        self.valor_actual = 0.0
        self.umbral_min = umbral_min
        self.umbral_max = umbral_max

    def leer(self):
        return self.valor_actual
