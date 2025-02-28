import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import './MerchantSpending.css'; // Make sure to import the CSS file

const MerchantSpending = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Define a color palette for the pie chart
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#d0ed57",
    "#a4de6c",
    "#8dd1e1",
    "#83a6ed",
  ];

  // Fetch category spending data from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8050/api/category-spending")
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching category spending data:", error)
      );
  }, []);

  // Fetch subcategory spending data based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          `http://127.0.0.1:8050/api/subcategory-spending?category=${encodeURIComponent(
            selectedCategory
          )}`
        )
        .then((response) => {
          setSubcategoryData(response.data.subcategory_data);
        })
        .catch((error) =>
          console.error("Error fetching subcategory spending data:", error)
        );
    }
  }, [selectedCategory]);

  // Handle category click
  const handleCategoryClick = (data) => {
    if (data?.payload?.name) {
      setSelectedCategory(data.payload.name);
    } else {
      console.error("Category name is undefined or not properly passed");
    }
  };

  return (
    <div className="background">
      <div className="merchant-spending-container">
        <h1>Interactive Merchant Spending Report</h1>

        {/* Introduction text */}
        <div className="intro-text">
          This interactive report visualizes the merchant spending data. The pie chart
          shows the distribution of spending across various categories. Clicking on a
          category will reveal a breakdown of spending by subcategory.
        </div>

        {/* Category Pie Chart */}
        <div className="pie-chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="Amount"
                nameKey="Category"
                innerRadius="40%"
                outerRadius="80%"
                fill="#8884d8"
                onClick={handleCategoryClick}
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(2)}%`} // Showing percentage on the chart
                activeShape={null} // Disable active shape outline when clicked
                isAnimationActive={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    style={{ outline: "none", border: "none", boxShadow: "none" }}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subcategory Pie Chart */}
        {selectedCategory && (
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={subcategoryData}
                  dataKey="Amount"
                  nameKey="Name"
                  innerRadius="40%"
                  outerRadius="80%"
                  fill="#82ca9d"
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(2)}%`} // Showing percentage on the subcategory chart
                  activeShape={null} // Disable active shape outline when clicked
                  isAnimationActive={false}
                >
                  {subcategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      style={{ outline: "none", border: "none", boxShadow: "none" }}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantSpending;
