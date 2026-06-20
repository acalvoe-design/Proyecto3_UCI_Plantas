from datetime import datetime
from collections import deque
from threading import Lock
import json


class DataRepository:
    """Manages sensor data storage and retrieval with timestamp tracking"""
    
    def __init__(self, max_history=1000):
        self.max_history = max_history
        self.sensor_history = deque(maxlen=max_history)
        self.current_data = {}
        self.lock = Lock()
    
    def store_reading(self, sensor_data):
        """Store a sensor reading with timestamp"""
        with self.lock:
            reading = {
                "timestamp": datetime.now().isoformat(),
                **sensor_data
            }
            self.sensor_history.append(reading)
            self.current_data = reading
        return reading
    
    def get_current_data(self):
        """Get the most recent sensor reading"""
        with self.lock:
            return self.current_data.copy() if self.current_data else None
    
    def get_history(self, limit=100):
        """Get historical data"""
        with self.lock:
            return list(self.sensor_history)[-limit:]
    
    def clear_history(self):
        """Clear all historical data"""
        with self.lock:
            self.sensor_history.clear()
            self.current_data = {}
