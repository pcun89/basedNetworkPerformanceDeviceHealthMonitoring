"""
app.py
Cloud Run API (safe imports)

Data structures:
- Flask routing (O(1))
- JSON serialization (O(n))
"""

from database import initDb
from flask import Flask, jsonify
import os
from database import addMetrics, addAlert
import time
import random


app = Flask(__name__)
initDb()


def seedData():
    for i in range(20):
        ts = int(time.time()) - i * 10

        addMetrics("192.168.1.1", ts, 1,
                   random.randint(1000, 5000),
                   random.randint(1000, 5000))

        if i % 5 == 0:
            addAlert(i, 5, ts, f"Test alert {i}")


seedData()

@app.route("/")
def home():
    return "NetHealth API Running"


@app.route("/health")
def health():
    return {"status": "ok"}


@app.route("/api/alerts")
def alerts():
    from database import recentAlerts

    rows = recentAlerts(20)
    return jsonify([
        {"id": r[0], "severity": r[1], "ts": r[2], "message": r[3]}
        for r in rows
    ])


@app.route("/api/metrics/<host>")
def metrics(host):
    from database import recentMetrics

    rows = recentMetrics(host, 50)
    return jsonify({
        "host": host,
        "metrics": [
            {"ts": r[0], "ifIndex": r[1], "inBytes": r[2], "outBytes": r[3]}
            for r in rows
        ]
    })


# ✅ ADD THIS BLOCK RIGHT HERE
@app.route("/seed")
def seed():
    import random
    import time
    from database import addMetrics, addAlert

    host = "192.168.1.1"
    ts = int(time.time())

    # insert fake metrics
    for i in range(20):
        addMetrics(
            host,
            ts + i,
            1,
            random.randint(1000, 10000),
            random.randint(1000, 10000)
        )

    # insert fake alert
    addAlert(999, 8, ts, "Test high bandwidth alert")

    return {"status": "seeded data"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"Starting API on port {port}")
    app.run(host="0.0.0.0", port=port)
