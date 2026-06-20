from class_Actuador import Actuador


class Humidificador(Actuador):
    def activar(self):
        self.activo = True
        print("Humidificador activado")

    def desactivar(self):
        self.activo = False
        print("Humidificador desactivado")
