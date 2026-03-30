"""
app.py
Cloud Run entrypoint (API only)

Data structures:
- Flask routing (O(1) per request)
"""

from flask import Flask, jsonify
import os

app = Flask(__name__)


@app.route("/")
def home():
    return "NetHealth API Running"


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"Starting API on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)
