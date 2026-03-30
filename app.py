"""
app.py
Cloud Run API (safe imports)

Data structures:
- Flask routing (O(1))
- JSON serialization (O(n))
"""

from flask import Flask, jsonify
import os

app = Flask(__name__)


@app.route("/")
def home():
    return "NetHealth API Running"


@app.route("/health")
def health():
    return {"status": "ok"}


@app.route("/api/alerts")
def alerts():
    # ✅ lazy import (prevents startup crash)
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


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"Starting API on port {port}")
    app.run(host="0.0.0.0", port=port)
