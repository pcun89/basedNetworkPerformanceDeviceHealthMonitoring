"""
app.py
Cloud Run API with CORS enabled
"""

from flask import Flask, jsonify
from flask_cors import CORS
from database import initDb, addMetrics, addAlert, recentAlerts, recentMetrics
import os
import time
import random

app = Flask(__name__)

# ✅ ALLOW FRONTEND ACCESS
CORS(app)

# initialize DB
initDb()


# -----------------------
# Seed Demo Data
# -----------------------
def seedData():
    for i in range(20):
        ts = int(time.time()) - i * 10

        addMetrics(
            "192.168.1.1",
            ts,
            1,
            random.randint(1000, 9000),
            random.randint(1000, 9000)
        )

        if i % 5 == 0:
            addAlert(i, 5, ts, f"High bandwidth warning #{i}")


seedData()


# -----------------------
# Routes
# -----------------------
@app.route("/")
def home():
    return "NetHealth API Running"


@app.route("/health")
def health():
    return {"status": "ok"}


@app.route("/api/alerts")
def alerts():
    rows = recentAlerts(20)

    return jsonify([
        {
            "id": r[0],
            "severity": r[1],
            "ts": r[2],
            "message": r[3]
        }
        for r in rows
    ])


@app.route("/api/metrics/<host>")
def metrics(host):
    rows = recentMetrics(host, 50)

    return jsonify({
        "host": host,
        "metrics": [
            {
                "ts": r[0],
                "ifIndex": r[1],
                "inBytes": r[2],
                "outBytes": r[3]
            }
            for r in rows
        ]
    })


@app.route("/seed")
def seed():
    seedData()
    return {"status": "seeded data"}


# -----------------------
# Run
# -----------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"Starting API on port {port}")
    app.run(host="0.0.0.0", port=port)
