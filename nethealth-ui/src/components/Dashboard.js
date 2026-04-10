import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const API = "https://nethealth-249578941686.us-central1.run.app";
const HOST = "192.168.1.1";

export default function Dashboard() {
    const [metrics, setMetrics] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 2000); // ⚡ faster = live feel
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const m = await axios.get(`${API}/api/metrics/${HOST}`);
            const a = await axios.get(`${API}/api/alerts`);

            setMetrics(m.data.metrics || []);
            setAlerts(a.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const data = metrics.slice().reverse().map(m => ({
        time: new Date(m.ts * 1000).toLocaleTimeString(),
        in: m.inBytes,
        out: m.outBytes,
    }));

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>📊 Network Dashboard</h1>

            {/* Animated Cards */}
            <div style={styles.cards}>
                <AnimatedCard title="Metrics" value={metrics.length} />
                <AnimatedCard title="Alerts" value={alerts.length} />
                <AnimatedCard title="Device" value={HOST} />
            </div>

            {/* Chart */}
            <motion.div
                style={styles.chart}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3>Bandwidth (Live)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line dataKey="in" stroke="#22c55e" strokeWidth={2} dot={false} />
                        <Line dataKey="out" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Alerts */}
            <div style={styles.alertBox}>
                <h3>🚨 Live Alerts</h3>
                {alerts.map((a) => (
                    <motion.div
                        key={a.id}
                        style={styles.alert}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {a.message}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const AnimatedCard = ({ title, value }) => (
    <motion.div
        style={styles.card}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <h4>{title}</h4>
        <p style={{ fontSize: "24px" }}>{value}</p>
    </motion.div>
);

const styles = {
    cards: {
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
    },
    card: {
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        flex: 1,
    },
    chart: {
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
    },
    alertBox: {
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
    },
    alert: {
        padding: "10px",
        marginTop: "10px",
        background: "#7f1d1d",
        borderRadius: "6px",
    },
};