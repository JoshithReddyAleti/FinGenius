import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LocationSpending.css";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, Legend,
    LineChart, Line,
    AreaChart, Area,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const LocationSpending = () => {
    const [locationData, setLocationData] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57", "#a4de6c", "#8dd1e1", "#83a6ed"];

    useEffect(() => {
        axios.get("http://127.0.0.1:8050/api/location-spending")
            .then((response) => {
                setLocationData(response.data);
            })
            .catch((error) => console.error("Error fetching location spending data:", error));
    }, []);

    const handlePieClick = (data) => {
        if (data && data.payload && data.payload.Location) {
            axios.get(`http://127.0.0.1:8050/api/category-spending?state=${data.payload.Location}`)
                .then((response) => {
                    setCategoryData(response.data);
                    setSelectedState(data.payload.Location);
                })
                .catch((error) => console.error("Error fetching category spending data:", error));
        }
    };

    return (
        <div className="background">
            <div className="location-spending-container">
                <h1>Interactive Location Spending Report</h1>

                {/* Pie Chart Section */}
                <div className="pie-chart-container">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={locationData}
                                dataKey="Amount"
                                nameKey="Location"
                                innerRadius="40%"
                                outerRadius="80%"
                                fill="#8884d8"
                                labelLine={false}
                                label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
                                onClick={handlePieClick}
                            >
                                {locationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Selected State Spending Breakdown */}
                {selectedState && (
                    <div className="selected-state-container">
                        <h2>Spending Breakdown for {selectedState}</h2>

                        <div className="category-charts-container">
                            {/* Bar Chart */}
                            <div className="chart-box">
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={categoryData}>
                                        <XAxis dataKey="Category" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Amount" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Line Chart */}
                            <div className="chart-box">
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={categoryData}>
                                        <XAxis dataKey="Category" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="Amount" stroke="#ff8042" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Area Chart */}
                            <div className="chart-box">
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart data={categoryData}>
                                        <XAxis dataKey="Category" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="Amount" fill="#8884d8" stroke="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Radar Chart */}
                            <div className="chart-box">
                                <ResponsiveContainer width="100%" height={400}>
                                    <RadarChart outerRadius={90} data={categoryData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="Category" />
                                        <PolarRadiusAxis />
                                        <Radar name="Spending" dataKey="Amount" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationSpending;

