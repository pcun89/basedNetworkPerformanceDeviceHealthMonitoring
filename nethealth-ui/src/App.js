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

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const metricsRes = await axios.get(`${API}/metrics`);
      const alertsRes = await axios.get(`${API}/alerts`);

      setMetrics(metricsRes.data || []);
      setAlerts(alertsRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const formatData = () => {
    return metrics.map((m) => ({
      time: new Date(m.timestamp * 1000).toLocaleTimeString(),
      in: m.in_bytes,
      out: m.out_bytes,
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
          <Card title="Total Metrics" value={metrics.length} />
          <Card title="Active Alerts" value={alerts.length} />
          <Card title="Devices" value="1" />
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
          <h3>Alerts</h3>
          {alerts.length === 0 ? (
            <p>No alerts</p>
          ) : (
            alerts.map((a, i) => (
              <div key={i} style={styles.alert}>
                {a.message}
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
    width: "200px",
    background: "#111",
    color: "#fff",
    padding: "20px",
    height: "100vh",
  },
  main: {
    flex: 1,
    padding: "20px",
    background: "#f5f6fa",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  chartBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  alertBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },
  alert: {
    padding: "10px",
    marginBottom: "10px",
    background: "#ffe6e6",
    borderRadius: "5px",
  },
};