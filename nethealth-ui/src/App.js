import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";

/**
 * Data Structure:
 * - Layout with sidebar + routed pages
 *
 * Time Complexity:
 * - Routing: O(1)
 */

export default function App() {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>NetHealth</h2>

        <Link style={styles.link} to="/">Dashboard</Link>
        <Link style={styles.link} to="/alerts">Alerts</Link>
      </div>

      {/* Main Content */}
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
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "220px",
    background: "#111",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    padding: "20px",
    background: "#f4f6f9",
    overflowY: "auto",
  },
};