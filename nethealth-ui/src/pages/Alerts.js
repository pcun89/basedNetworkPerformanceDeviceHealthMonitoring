import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://nethealth-249578941686.us-central1.run.app";

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get(`${API}/api/alerts`)
            .then(res => setAlerts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>🚨 Alerts Page</h1>
            {alerts.map(a => (
                <div key={a.id}>{a.message}</div>
            ))}
        </div>
    );
}