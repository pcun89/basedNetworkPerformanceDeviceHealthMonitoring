import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://nethealth-249578941686.us-central1.run.app";

/**
 * Data Structure:
 * - alerts: Array
 *
 * Time Complexity:
 * - Fetch: O(n)
 * - Render: O(n)
 */

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API}/api/alerts`)
            .then(res => {
                setAlerts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <h2>Loading alerts...</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>🚨 Alerts</h1>

            {alerts.length === 0 ? (
                <p>No alerts found</p>
            ) : (
                alerts.map(a => (
                    <div key={a.id} style={{
                        background: "#ff4d4f",
                        padding: "10px",
                        margin: "10px 0",
                        color: "white",
                        borderRadius: "5px"
                    }}>
                        {a.message}
                    </div>
                ))
            )}
        </div>
    );
}