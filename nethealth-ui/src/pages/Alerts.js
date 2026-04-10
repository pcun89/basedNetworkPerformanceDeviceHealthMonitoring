import React from "react";

const Alerts = ({ alerts }) => {
    return (
        <div>
            <h2>🚨 Alerts</h2>

            {alerts.length === 0 && <p>No alerts</p>}

            {alerts.map((a) => (
                <div
                    key={a.id}
                    style={{
                        border: "1px solid red",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        background: "#ffe5e5",
                    }}
                >
                    <strong>Severity:</strong> {a.severity}
                    <br />
                    {a.message}
                </div>
            ))}
        </div>
    );
};

export default Alerts;