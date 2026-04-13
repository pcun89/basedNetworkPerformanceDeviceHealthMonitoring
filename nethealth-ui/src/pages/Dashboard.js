import { useEffect, useState } from "react";
import axios from "axios";
import MetricsChart from "../components/MetricsChart";

const API = "https://nethealth-249578941686.us-central1.run.app";
const HOST = "192.168.1.1";

export default function Dashboard() {
    const [metrics, setMetrics] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const m = await axios.get(`${API}/api/metrics/${HOST}`);
            const a = await axios.get(`${API}/api/alerts`);

            setMetrics(m.data.metrics || []);
            setAlerts(a.data || []);
            setLoading(false);
        } catch (err) {
            console.error("API ERROR:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }

    return (
        <div>
            <h1>📊 Dashboard</h1>

            <p>Metrics count: {metrics.length}</p>
            <p>Alerts count: {alerts.length}</p>

            <MetricsChart data={metrics} />

            <h3>🚨 Alerts</h3>
            {alerts.map((a) => (
                <div key={a.id}>{a.message}</div>
            ))}
        </div>
    );
}