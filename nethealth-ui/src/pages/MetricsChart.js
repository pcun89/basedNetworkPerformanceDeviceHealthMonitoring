import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const MetricsChart = ({ data }) => {
    const formatted = data.map((d) => ({
        time: new Date(d.ts * 1000).toLocaleTimeString(),
        inBytes: d.inBytes,
        outBytes: d.outBytes,
    }));

    return (
        <div>
            <h2>📈 Bandwidth Metrics</h2>

            <LineChart width={600} height={300} data={formatted}>
                <CartesianGrid />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="inBytes" />
                <Line type="monotone" dataKey="outBytes" />
            </LineChart>
        </div>
    );
};

export default MetricsChart;