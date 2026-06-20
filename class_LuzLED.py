from class_Actuador import Actuador


class LuzLED(Actuador):
    def activar(self):
        self.activo = True
        print("Luz LED encendida")

    def desactivar(self):
        self.activo = False
        print("Luz LED apagada")
