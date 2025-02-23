import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
    <div>
      <h1>Interactive Merchant Spending Report</h1>

      {/* Category Pie Chart */}
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
            // Custom hover styles
            isAnimationActive={false}
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                // Inline styles to disable hover and focus effects
                style={{ outline: "none", border: "none", boxShadow: "none" }}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Subcategory Pie Chart */}
      {selectedCategory && (
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
              // Custom hover styles
              isAnimationActive={false}
            >
              {subcategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  // Inline styles to disable hover and focus effects
                  style={{ outline: "none", border: "none", boxShadow: "none" }}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MerchantSpending;
