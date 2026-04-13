import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const MetricsChart = ({ data }) => {
    const formatted = data.map((d) => ({
        time: new Date(d.ts * 1000).toLocaleTimeString(),
        inBytes: d.inBytes,
        outBytes: d.outBytes,
    }));

    return (
        <div style={{ width: "100%", height: 300 }}>
            <h2>📈 Bandwidth Metrics</h2>

            <ResponsiveContainer>
                <LineChart data={formatted}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="inBytes" />
                    <Line type="monotone" dataKey="outBytes" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MetricsChart;