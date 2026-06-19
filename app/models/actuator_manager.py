"""Manager for handling multiple actuators"""


class ActuatorManager:
    """Manages all actuators in the system"""
    
    def __init__(self):
        self.actuators = {}
    
    def register_actuator(self, actuator_id, actuator_object):
        """Register an actuator"""
        self.actuators[actuator_id] = actuator_object
    
    def activate(self, actuator_id):
        """Activate a specific actuator"""
        if actuator_id in self.actuators:
            self.actuators[actuator_id].activar()
            return {"status": "activated", "actuator_id": actuator_id}
        raise ValueError(f"Actuator {actuator_id} not found")
    
    def deactivate(self, actuator_id):
        """Deactivate a specific actuator"""
        if actuator_id in self.actuators:
            self.actuators[actuator_id].desactivar()
            return {"status": "deactivated", "actuator_id": actuator_id}
        raise ValueError(f"Actuator {actuator_id} not found")
    
    def toggle(self, actuator_id):
        """Toggle actuator state"""
        if actuator_id in self.actuators:
            actuator = self.actuators[actuator_id]
            if actuator.esta_activo():
                actuator.desactivar()
                return {"status": "deactivated", "actuator_id": actuator_id}
            else:
                actuator.activar()
                return {"status": "activated", "actuator_id": actuator_id}
        raise ValueError(f"Actuator {actuator_id} not found")
    
    def get_actuator_status(self):
        """Get status of all actuators"""
        status = {}
        for actuator_id, actuator in self.actuators.items():
            status[actuator_id] = {
                "active": actuator.esta_activo(),
                "type": type(actuator).__name__
            }
        return status
