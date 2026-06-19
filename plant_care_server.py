from flask import Flask, request, jsonify
from datetime import datetime
import json

app = Flask(__name__)

# Store the latest sensor readings
latest_data = {
    "soil_adc": 0,
    "soil_percent": 0,
    "dht_humidity": 0,
    "temperature": 0,
    "lux": 0,
    "humidifier_state": 0,
    "motor_on": False,
    "led_on": False,
    "timestamp": 0,
    "received_time": None
}

@app.route('/sensor_data', methods=['POST'])
def receive_sensor_data():
    """
    Receive sensor data from ESP32
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
        data = request.get_json()
        
        # Update latest data
        latest_data.update(data)
        latest_data["received_time"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Print to console
        print("\n" + "="*60)
        print(f"Datos recibidos del ESP32 - {latest_data['received_time']}")
        print("="*60)
        print(f"Humedad del Suelo:    {data['soil_percent']}% (ADC: {data['soil_adc']})")
        print(f"Humedad DHT:          {data['dht_humidity']:.1f}%")
        print(f"Temperatura:          {data['temperature']:.1f}°C")
        print(f"Luz (Lux):            {data['lux']:.1f}")
        print(f"Humidificador:        Estado {data['humidifier_state']}")
        print(f"Motor:                {'ON' if data['motor_on'] else 'OFF'}")
        print(f"LED:                  {'ON' if data['led_on'] else 'OFF'}")
        print("="*60 + "\n")
        
        return jsonify({
            "status": "success",
            "message": "Datos recibidos correctamente",
            "data": latest_data
        }), 200
        
    except Exception as e:
        print(f"Error procesando datos: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

@app.route('/get_data', methods=['GET'])
def get_latest_data():
    """
    Get the latest sensor data
    """
    return jsonify(latest_data), 200

@app.route('/status', methods=['GET'])
def status():
    """
    Get server status
    """
    return jsonify({
        "status": "running",
        "last_update": latest_data.get("received_time", "No data received yet"),
        "has_data": latest_data.get("received_time") is not None
    }), 200

@app.route('/', methods=['GET'])
def home():
    """
    Simple home page showing latest data
    """
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Plant Care System - Sensor Dashboard</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            .container {
                background: white;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                padding: 30px;
                max-width: 800px;
                width: 100%;
            }
            h1 {
                color: #333;
                margin-bottom: 10px;
                text-align: center;
            }
            .subtitle {
                color: #666;
                text-align: center;
                margin-bottom: 30px;
                font-size: 14px;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            .card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            }
            .card.green { background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); color: #333; }
            .card.blue { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: #333; }
            .card.orange { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: #333; }
            .card.red { background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%); }
            .card label {
                display: block;
                font-size: 12px;
                opacity: 0.9;
                margin-bottom: 5px;
            }
            .card .value {
                font-size: 28px;
                font-weight: bold;
            }
            .card .unit {
                font-size: 12px;
                margin-top: 5px;
            }
            .status {
                background: #f0f0f0;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: center;
                color: #666;
                font-size: 13px;
            }
            .status.active {
                background: #d4edda;
                color: #155724;
            }
            .status.inactive {
                background: #f8d7da;
                color: #721c24;
            }
            .controls {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-top: 20px;
            }
            button {
                padding: 10px;
                border: none;
                border-radius: 8px;
                background: #667eea;
                color: white;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
            }
            button:hover {
                background: #764ba2;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌱 Sistema de Cuidado de Plantas</h1>
            <div class="subtitle">Dashboard en Tiempo Real</div>
            
            <div class="grid">
                <div class="card green">
                    <label>Humedad Suelo</label>
                    <div class="value" id="soil-percent">--</div>
                    <div class="unit">%</div>
                </div>
                <div class="card blue">
                    <label>Humedad DHT</label>
                    <div class="value" id="dht-humidity">--</div>
                    <div class="unit">%</div>
                </div>
                <div class="card orange">
                    <label>Temperatura</label>
                    <div class="value" id="temperature">--</div>
                    <div class="unit">°C</div>
                </div>
                <div class="card blue">
                    <label>Luz (Lux)</label>
                    <div class="value" id="lux">--</div>
                    <div class="unit">lux</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div class="card">
                    <label>Motor</label>
                    <div class="value" id="motor-status">OFF</div>
                </div>
                <div class="card">
                    <label>LED</label>
                    <div class="value" id="led-status">OFF</div>
                </div>
            </div>
            
            <div class="status" id="status">
                ⏳ Esperando datos...
            </div>
            
            <div class="controls">
                <button onclick="refreshData()">🔄 Actualizar</button>
                <button onclick="location.reload()">🔁 Recargar Página</button>
            </div>
        </div>
        
        <script>
            function refreshData() {
                fetch('/get_data')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('soil-percent').textContent = data.soil_percent;
                        document.getElementById('dht-humidity').textContent = data.dht_humidity.toFixed(1);
                        document.getElementById('temperature').textContent = data.temperature.toFixed(1);
                        document.getElementById('lux').textContent = data.lux.toFixed(1);
                        document.getElementById('motor-status').textContent = data.motor_on ? '✓ ON' : '✗ OFF';
                        document.getElementById('led-status').textContent = data.led_on ? '✓ ON' : '✗ OFF';
                        
                        const status = document.getElementById('status');
                        if (data.received_time) {
                            status.className = 'status active';
                            status.textContent = '✓ En línea - Última actualización: ' + data.received_time;
                        } else {
                            status.className = 'status inactive';
                            status.textContent = '✗ Sin conexión';
                        }
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        document.getElementById('status').className = 'status inactive';
                        document.getElementById('status').textContent = '✗ Error conectando al servidor';
                    });
            }
            
            // Refresh data every 2 seconds
            setInterval(refreshData, 2000);
            refreshData(); // Initial load
        </script>
    </body>
    </html>
    """
    return html

if __name__ == '__main__':
    print("\n" + "="*60)
    print("Servidor de Monitoreo de Plantas Iniciado")
    print("="*60)
    print("Acceso local: http://localhost:5000")
    print("Para ESP32: http://172.16.98.113:5000")
    print("\nEsperando datos del ESP32...")
    print("="*60 + "\n")
    
    # Run on all interfaces so it's accessible from ESP32
    app.run(host='0.0.0.0', port=5000, debug=True)
