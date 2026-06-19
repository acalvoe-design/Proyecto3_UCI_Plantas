"""Manager for handling multiple sensors with data aggregation"""


class SensorManager:
    """Manages all sensors in the system"""
    
    def __init__(self):
        self.sensors = {}
    
    def register_sensor(self, sensor_id, sensor_object):
        """Register a sensor"""
        self.sensors[sensor_id] = sensor_object
    
    def read_all(self):
        """Read values from all sensors"""
        readings = {}
        for sensor_id, sensor in self.sensors.items():
            readings[sensor_id] = sensor.leer()
        return readings
    
    def read_sensor(self, sensor_id):
        """Read a specific sensor"""
        if sensor_id in self.sensors:
            return self.sensors[sensor_id].leer()
        raise ValueError(f"Sensor {sensor_id} not found")
    
    def get_sensor_status(self):
        """Get status of all sensors"""
        status = {}
        for sensor_id, sensor in self.sensors.items():
            status[sensor_id] = {
                "value": sensor.leer(),
                "unit": getattr(sensor, "unidad", ""),
                "status": "OK"
            }
        return status
