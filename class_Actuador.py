class Actuador:
    def __init__(self, pin, tiempo_activacion):
        self.pin = pin
        self.activo = False
        self.tiempo_activacion = tiempo_activacion

    def activar(self):
        self.activo = True
        print("Actuador activado")

    def desactivar(self):
        self.activo = False
        print("Actuador desactivado")

    def esta_activo(self):
        return self.activo
