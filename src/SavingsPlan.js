import React, { useState, useEffect } from "react";
import axios from "axios";

function SavingsPlan() {
  // State to hold the savings plan data
  const [savingsData, setSavingsData] = useState(null);

  // Fetch savings data from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8050/api/savings-plan")
      .then((response) => {
        setSavingsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching savings plan data:", error);
      });
  }, []);

  // Check if the data is available
  if (!savingsData) {
    return <div>Loading savings plan...</div>;
  }

  // Destructure the data for easier access
  const { recommended_savings, last_month_spending, spending_categories } =
    savingsData;

  // Check if spending_categories is available
  if (!spending_categories) {
    return <div>Error: Spending categories data is missing.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Savings Plan for the Current Month</h2>
      <p>
        Here is a recommended savings plan based on your previous spending data:
      </p>

      {/* Display Recommended Savings */}
      <h3>Recommended Savings: ${recommended_savings}</h3>

      {/* Display Last Month's Spending */}
      <p>Last month's total spending: ${last_month_spending}</p>

      {/* Display Spending Breakdown by Category */}
      <h4>Spending Breakdown:</h4>
      <ul>
        {Object.entries(spending_categories).map(([category, amount]) => (
          <li key={category}>
            {category}: ${amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavingsPlan;
