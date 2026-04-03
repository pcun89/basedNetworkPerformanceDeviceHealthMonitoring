import React, { useEffect, useState } from "react";
import axios from "axios";
import Alerts from "./components/Alerts";
import MetricsChart from "./components/MetricsChart";

const API = "https://nethealth-249578941686.us-central1.run.app";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const alertRes = await axios.get(`${API}/api/alerts`);
      setAlerts(alertRes.data);

      const metricRes = await axios.get(
        `${API}/api/metrics/192.168.1.1`
      );
      setMetrics(metricRes.data.metrics);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>NetHealth Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <Alerts alerts={alerts} />
        </div>

        <div style={{ flex: 2 }}>
          <MetricsChart data={metrics} />
        </div>
      </div>
    </div>
  );
}

export default App;