"""Main plant care system controller following OOP principles"""

from datetime import datetime


class PlantSystem:
    """Main controller for the plant care system"""
    
    def __init__(self, sensor_manager, actuator_manager, data_repository, rule_engine):
        self.sensor_manager = sensor_manager
        self.actuator_manager = actuator_manager
        self.data_repository = data_repository
        self.rule_engine = rule_engine
        
        # System state
        self.system_active = False
        self.plant_config = {
            "name": "Mi Planta",
            "type": "Desconocida",
            "care_level": "normal"
        }
    
    def initialize(self):
        """Initialize the plant care system"""
        self.system_active = True
        self.rule_engine.enable()
        return {
            "status": "initialized",
            "timestamp": datetime.now().isoformat()
        }
    
    def shutdown(self):
        """Shutdown the system"""
        self.system_active = False
        self.rule_engine.disable()
        # Deactivate all actuators
        for actuator_id in list(self.actuator_manager.actuators.keys()):
            try:
                self.actuator_manager.deactivate(actuator_id)
            except:
                pass
        return {
            "status": "shutdown",
            "timestamp": datetime.now().isoformat()
        }
    
    def process_sensor_data(self, sensor_data):
        """Process incoming sensor data from Arduino"""
        if not self.system_active:
            return {"error": "System not active"}
        
        # Store data
        stored_data = self.data_repository.store_reading(sensor_data)
        
        # Evaluate rules and apply automatic control
        rule_results = self.rule_engine.evaluate_rules(sensor_data)
        
        return {
            "status": "processed",
            "stored_data": stored_data,
            "rule_results": rule_results
        }
    
    def get_system_status(self):
        """Get complete system status"""
        current_data = self.data_repository.get_current_data()
        
        # Map raw data from repository to sensor-friendly format
        sensors = self._build_sensor_status_from_data(current_data)
        
        return {
            "active": self.system_active,
            "current_data": current_data,
            "sensors": sensors,
            "actuators": self.actuator_manager.get_actuator_status(),
            "plant_config": self.plant_config,
            "timestamp": datetime.now().isoformat()
        }
    
    def _build_sensor_status_from_data(self, current_data):
        """Build sensor status from current data, with mapping from raw field names"""
        if not current_data:
            return self.sensor_manager.get_sensor_status()
        
        # Mapping of raw field names to sensor IDs with default units
        field_mapping = {
            "temperature": ("temperature", "°C"),
            "dht_humidity": ("air_humidity", "%"),
            "lux": ("light", "lux"),
            "soil_percent": ("soil_humidity", "%"),
        }
        
        sensors = {}
        for sensor_id, sensor_obj in self.sensor_manager.sensors.items():
            # Find the corresponding field in current_data
            field_name = None
            default_unit = ""
            for raw_field, (mapped_id, unit) in field_mapping.items():
                if mapped_id == sensor_id and raw_field in current_data:
                    field_name = raw_field
                    default_unit = unit
                    break
            
            # Get value from current_data or from sensor object
            if field_name and field_name in current_data:
                value = current_data[field_name]
            else:
                value = sensor_obj.leer()
            
            # Get unit from sensor object if available, otherwise use default
            unit = getattr(sensor_obj, "unidad", default_unit)
            
            sensors[sensor_id] = {
                "value": value,
                "unit": unit,
                "status": "OK"
            }
        
        return sensors
    
    def update_plant_config(self, config_update):
        """Update plant configuration"""
        self.plant_config.update(config_update)
        return {
            "status": "updated",
            "config": self.plant_config
        }
    
    def get_historical_data(self, limit=100):
        """Get historical sensor data"""
        return {
            "limit": limit,
            "data": self.data_repository.get_history(limit)
        }
    
    def control_actuator(self, actuator_id, action):
        """Manually control an actuator"""
        if action == "activate":
            return self.actuator_manager.activate(actuator_id)
        elif action == "deactivate":
            return self.actuator_manager.deactivate(actuator_id)
        elif action == "toggle":
            return self.actuator_manager.toggle(actuator_id)
        else:
            raise ValueError(f"Unknown action: {action}")
