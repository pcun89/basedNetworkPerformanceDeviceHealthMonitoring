import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API = "https://nethealth-249578941686.us-central1.run.app";
const HOST = "192.168.1.1"; // 🔥 must match your backend device

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // 🔁 real-time refresh
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const metricsRes = await axios.get(`${API}/api/metrics/${HOST}`);
      const alertsRes = await axios.get(`${API}/api/alerts`);

      setMetrics(metricsRes.data.metrics || []);
      setAlerts(alertsRes.data || []);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  // 🔥 Convert backend format → chart format
  const formatData = () => {
    return metrics
      .slice()
      .reverse()
      .map((m) => ({
        time: new Date(m.ts * 1000).toLocaleTimeString(),
        in: m.inBytes,
        out: m.outBytes,
      }));
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>NetHealth</h2>
        <p>Dashboard</p>
        <p>Devices</p>
        <p>Alerts</p>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <h1>Network Dashboard</h1>

        {/* KPI Cards */}
        <div style={styles.cards}>
          <Card title="Metrics Points" value={metrics.length} />
          <Card title="Alerts" value={alerts.length} />
          <Card title="Device" value={HOST} />
        </div>

        {/* Chart */}
        <div style={styles.chartBox}>
          <h3>Bandwidth Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formatData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="in" />
              <Line type="monotone" dataKey="out" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div style={styles.alertBox}>
          <h3>Recent Alerts</h3>
          {alerts.length === 0 ? (
            <p>No alerts</p>
          ) : (
            alerts.map((a) => (
              <div key={a.id} style={styles.alert}>
                ⚠️ {a.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Card */
const Card = ({ title, value }) => (
  <div style={styles.card}>
    <h4>{title}</h4>
    <p style={{ fontSize: "24px" }}>{value}</p>
  </div>
);

/* Styles */
const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial",
  },
  sidebar: {
    width: "220px",
    background: "#0f172a",
    color: "#fff",
    padding: "20px",
    height: "100vh",
  },
  main: {
    flex: 1,
    padding: "20px",
    background: "#f1f5f9",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    flex: 1,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  chartBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  alertBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
  },
  alert: {
    padding: "10px",
    marginBottom: "10px",
    background: "#fee2e2",
    borderRadius: "6px",
  },
};