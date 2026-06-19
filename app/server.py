from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models.data_repository import DataRepository
from models.sensor_manager import SensorManager
from models.actuator_manager import ActuatorManager
from models.rule_engine import RuleEngine
from models.plant_system import PlantSystem

# Import the existing classes
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from class_Sensor import Sensor
from class_SensorTemperatura import SensorTemperatura
from class_SensorHumedad import SensorHumedad
from class_SensorLuz import SensorLuz
from class_Actuador import Actuador
from class_Ventilador import Ventilador
from class_Humidificador import Humidificador
from class_LuzLED import LuzLED

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize managers
data_repository = DataRepository()
sensor_manager = SensorManager()
actuator_manager = ActuatorManager()
rule_engine = RuleEngine(sensor_manager, actuator_manager)
plant_system = PlantSystem(sensor_manager, actuator_manager, data_repository, rule_engine)

# Initialize sensors (will be populated from Arduino data)
sensor_manager.register_sensor("soil_humidity", Sensor(32, 0, 100))
sensor_manager.register_sensor("temperature", SensorTemperatura(4, 15, 30))
sensor_manager.register_sensor("air_humidity", SensorHumedad(0, 20, 80))
sensor_manager.register_sensor("light", SensorLuz(35, 0, 65535))

# Initialize actuators
humidifier = Humidificador(13, 300)
fan = Ventilador(14, 300)
led = LuzLED(15, 300)

actuator_manager.register_actuator("humidifier", humidifier)
actuator_manager.register_actuator("fan", fan)
actuator_manager.register_actuator("led", led)

# Add some default rules
def humidity_rule_condition(readings):
    """Activate humidifier if soil humidity is too low"""
    return readings.get("soil_percent", 0) < 30

def humidity_rule_action():
    """Action: activate humidifier"""
    return actuator_manager.activate("humidifier")

def temperature_rule_condition(readings):
    """Activate fan if temperature is too high"""
    return readings.get("temperature", 0) > 28

def temperature_rule_action():
    """Action: activate fan"""
    return actuator_manager.activate("fan")

rule_engine.add_rule("humidity_control", humidity_rule_condition, humidity_rule_action)
rule_engine.add_rule("temperature_control", temperature_rule_condition, temperature_rule_action)

# Initialize system
plant_system.initialize()


# ===== API ROUTES =====

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok"}), 200


@app.route('/api/system/status', methods=['GET'])
def get_system_status():
    """Get complete system status"""
    return jsonify(plant_system.get_system_status()), 200


@app.route('/api/system/initialize', methods=['POST'])
def initialize_system():
    """Initialize the plant care system"""
    result = plant_system.initialize()
    return jsonify(result), 200


@app.route('/api/system/shutdown', methods=['POST'])
def shutdown_system():
    """Shutdown the plant care system"""
    result = plant_system.shutdown()
    return jsonify(result), 200


@app.route('/api/sensors/current', methods=['GET'])
def get_current_sensors():
    """Get current sensor readings"""
    return jsonify({
        "sensors": sensor_manager.get_sensor_status(),
        "latest_data": data_repository.get_current_data()
    }), 200


@app.route('/api/sensors/history', methods=['GET'])
def get_sensor_history():
    """Get historical sensor data"""
    limit = request.args.get('limit', 100, type=int)
    return jsonify(plant_system.get_historical_data(limit)), 200


@app.route('/api/actuators/status', methods=['GET'])
def get_actuators_status():
    """Get status of all actuators"""
    return jsonify({"actuators": actuator_manager.get_actuator_status()}), 200


@app.route('/api/actuators/control', methods=['POST'])
def control_actuator():
    """Control an actuator"""
    data = request.get_json()
    actuator_id = data.get('actuator_id')
    action = data.get('action')  # 'activate', 'deactivate', 'toggle'
    
    try:
        result = plant_system.control_actuator(actuator_id, action)
        return jsonify({"status": "success", "result": result}), 200
    except ValueError as e:
        return jsonify({"status": "error", "message": str(e)}), 400


@app.route('/api/plant/config', methods=['GET'])
def get_plant_config():
    """Get plant configuration"""
    return jsonify(plant_system.plant_config), 200


@app.route('/api/plant/config', methods=['POST'])
def update_plant_config():
    """Update plant configuration"""
    data = request.get_json()
    result = plant_system.update_plant_config(data)
    return jsonify(result), 200


@app.route('/api/rules/status', methods=['GET'])
def get_rules_status():
    """Get automation rules status"""
    return jsonify({
        "enabled": rule_engine.enabled,
        "rules": list(rule_engine.rules.keys())
    }), 200


@app.route('/api/rules/toggle', methods=['POST'])
def toggle_rules():
    """Toggle automatic rules on/off"""
    if rule_engine.enabled:
        rule_engine.disable()
        status = "disabled"
    else:
        rule_engine.enable()
        status = "enabled"
    
    return jsonify({"status": status}), 200


# ===== ARDUINO DATA ENDPOINT =====

@app.route('/sensor_data', methods=['POST'])
def receive_sensor_data():
    """
    Receive sensor data from ESP32/Arduino
    Expected JSON format:
    {
        "soil_adc": int,
        "soil_percent": int,
        "dht_humidity": float,
        "temperature": float,
        "lux": float,
        "humidifier_state": int,
        "motor_on": int,
        "led_on": int,
        "timestamp": int
    }
    """
    try:
        sensor_data = request.get_json()
        
        # Process sensor data through the plant system
        result = plant_system.process_sensor_data(sensor_data)
        
        # Print to console
        print("\n" + "="*60)
        print(f"Datos recibidos del ESP32 - {sensor_data.get('received_time', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))}")
        print("="*60)
        print(f"Humedad del Suelo:    {sensor_data.get('soil_percent', 'N/A')}% (ADC: {sensor_data.get('soil_adc', 'N/A')})")
        print(f"Humedad DHT:          {sensor_data.get('dht_humidity', 'N/A'):.1f}%")
        print(f"Temperatura:          {sensor_data.get('temperature', 'N/A'):.1f}°C")
        print(f"Luz:                  {sensor_data.get('lux', 'N/A')} lux")
        print(f"Humidificador:        {'ON' if sensor_data.get('humidifier_state') else 'OFF'}")
        print(f"Motor:                {'ON' if sensor_data.get('motor_on') else 'OFF'}")
        print(f"LED:                  {'ON' if sensor_data.get('led_on') else 'OFF'}")
        print("="*60 + "\n")
        
        return jsonify({
            "status": "received",
            "message": "Datos procesados correctamente",
            "result": result
        }), 200
    
    except Exception as e:
        print(f"Error procesando datos: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    print("Starting Plant Care Server...")
    print("Available endpoints:")
    print("  GET  /health")
    print("  GET  /api/system/status")
    print("  POST /api/system/initialize")
    print("  POST /api/system/shutdown")
    print("  GET  /api/sensors/current")
    print("  GET  /api/sensors/history")
    print("  GET  /api/actuators/status")
    print("  POST /api/actuators/control")
    print("  GET  /api/plant/config")
    print("  POST /api/plant/config")
    print("  GET  /api/rules/status")
    print("  POST /api/rules/toggle")
    print("  POST /sensor_data (Arduino webhook)")
    print("\nServer running at http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
