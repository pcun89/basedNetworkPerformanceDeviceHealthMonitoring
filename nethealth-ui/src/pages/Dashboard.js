import { useEffect, useState } from "react";
import axios from "axios";
import MetricsChart from "../components/MetricsChart";

/**
 * Data Structures:
 * - metrics: Array
 * - alerts: Array
 *
 * Time Complexity:
 * - API fetch: O(n)
 * - Rendering: O(n)
 */

const API = "https://nethealth-249578941686.us-central1.run.app";

export default function Dashboard() {
    const [metrics, setMetrics] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const host = "192.168.1.1";

    const fetchData = async () => {
        try {
            setLoading(true);

            const [metricsRes, alertsRes] = await Promise.all([
                axios.get(`${API}/api/metrics/${host}`),
                axios.get(`${API}/api/alerts`)
            ]);

            setMetrics(metricsRes.data.metrics);
            setAlerts(alertsRes.data);

            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Auto refresh every 5 seconds (real-time feel)
    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <h2>Loading dashboard...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>📊 Network Dashboard</h1>

            {/* Stats */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div style={card}>
                    <h3>Metrics Points</h3>
                    <p>{metrics.length}</p>
                </div>

                <div style={card}>
                    <h3>Alerts</h3>
                    <p>{alerts.length}</p>
                </div>

                <div style={card}>
                    <h3>Device</h3>
                    <p>{host}</p>
                </div>
            </div>

            {/* Chart */}
            <MetricsChart data={metrics} />

            {/* Alerts */}
            <h2 style={{ marginTop: "30px" }}>🚨 Recent Alerts</h2>
            {alerts.length === 0 ? (
                <p>No alerts</p>
            ) : (
                alerts.map((a) => (
                    <div key={a.id} style={alertCard}>
                        {a.message}
                    </div>
                ))
            )}
        </div>
    );
}

const card = {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    background: "#1e1e2f",
    color: "white",
};

const alertCard = {
    padding: "10px",
    marginTop: "10px",
    background: "#ff4d4f",
    color: "white",
    borderRadius: "6px",
};