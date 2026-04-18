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

/**
 * Data Structure:
 * - Array of objects [{ ts, inBytes, outBytes }]
 *
 * Time Complexity:
 * - Formatting: O(n)
 * - Rendering chart: O(n)
 */

const MetricsChart = ({ data = [] }) => {
    if (!data || data.length === 0) {
        return <p>No bandwidth data yet...</p>;
    }

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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="inBytes"
                        stroke="#4caf50"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="outBytes"
                        stroke="#2196f3"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MetricsChart;