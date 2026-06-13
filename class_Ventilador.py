class Ventilador(Actuador):
    def activar(self):
        self.activo = True
        print("Ventilador activado")

    def desactivar(self):
        self.activo = False
        print("Ventilador desactivado")
