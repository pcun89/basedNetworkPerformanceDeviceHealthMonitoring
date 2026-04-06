from flask import Flask, jsonify, render_template_string, request
from database import recentAlerts, recentMetrics
import database

app = Flask(__name__)

# ---------------- EXISTING ROUTES ---------------- #


@app.route("/")
def index():
    alerts = recentAlerts(10)
    deviceCount = "see /api/devices"
    return render_template_string(TEMPLATE, alerts=alerts, deviceCount=deviceCount)


@app.route("/api/alerts")
def apiAlerts():
    limit = int(request.args.get("limit", "50"))
    rows = recentAlerts(limit)
    return jsonify([
        {"id": r[0], "severity": r[1], "ts": r[2], "message": r[3]}
        for r in rows
    ])


@app.route("/api/metrics/<host>")
def apiMetrics(host):
    limit = int(request.args.get("limit", "100"))
    rows = recentMetrics(host, limit)
    data = [
        {"ts": r[0], "ifIndex": r[1], "inBytes": r[2], "outBytes": r[3]}
        for r in rows
    ]
    return jsonify({"host": host, "metrics": data})


# ---------------- NEW ROUTES (FOR FRONTEND) ---------------- #

@app.route("/metrics")
def metrics():
    """
    Flatten all device metrics into one list for frontend charts
    """
    # 🔥 TEMP: hardcode device (you can improve later)
    host = "192.168.1.1"

    rows = recentMetrics(host, 100)

    return jsonify([
        {
            "timestamp": r[0],
            "in_bytes": r[2],
            "out_bytes": r[3]
        }
        for r in rows
    ])


@app.route("/alerts")
def alerts():
    rows = recentAlerts(50)

    return jsonify([
        {
            "id": r[0],
            "severity": r[1],
            "timestamp": r[2],
            "message": r[3]
        }
        for r in rows
    ])


@app.route("/test")
def test():
    return "NEW VERSION DEPLOYED"
