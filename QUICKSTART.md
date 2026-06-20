# Quick Start Guide


### 1. Backend Setup (Python)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Navigate to app directory
cd app

# Run Flask server
python server.py
```

✅ Server running at: **http://localhost:5000**

### 2. Frontend Setup (React)

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ App running at: **http://localhost:3000**

### 3. Open in Browser

Navigate to: **http://localhost:3000**


---

## 🔌 Connect ESP32

1. Update `plantcontroller.ino`:
   ```cpp
   const char* ssid = "Your_WiFi";
   const char* password = "Your_Password";
   const char* serverURL = "http://YOUR_SERVER_IP:5000/sensor_data";
   ```

2. Upload sketch to ESP32

3. Arduino will automatically send data every 5 seconds

---
