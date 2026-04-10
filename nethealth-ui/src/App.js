import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Devices from "./pages/Devices";

export default function App() {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: 30 }}>NetHealth</h2>
        <Link style={styles.link} to="/">Dashboard</Link>
        <Link style={styles.link} to="/devices">Devices</Link>
        <Link style={styles.link} to="/alerts">Alerts</Link>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    background: "#0f172a",
    color: "#e2e8f0",
    minHeight: "100vh",
  },
  sidebar: {
    width: "220px",
    background: "#020617",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
  },
  main: {
    flex: 1,
    padding: "20px",
  },
};