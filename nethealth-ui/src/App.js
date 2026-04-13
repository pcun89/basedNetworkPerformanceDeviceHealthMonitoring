import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={styles.sidebar}>
        <h2>NetHealth</h2>
        <Link to="/">Dashboard</Link>
        <Link to="/alerts">Alerts</Link>
      </div>

      <div style={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    background: "#111",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  main: {
    flex: 1,
    padding: "20px",
    background: "#f4f4f4",
  },
};