from dash import Dash, dcc, html  # Ensure 'html' is imported
from dash.dependencies import Input, Output
import pandas as pd
import plotly.express as px
from flask import Flask, jsonify
from flask_cors import CORS

# Enable CORS for the entire Dash app
server = Flask(__name__)
CORS(server)
# Load CSV file (Replace with actual file path)
df = pd.read_csv("Book1.csv")

# Convert 'Date' column to datetime format
df['Date'] = pd.to_datetime(df['Date'], format='%d-%m-%Y')

# Filter only debit transactions (spending)
df_debit = df[df['Debit/Credit'] == 'Debit']

# Aggregate spending by category
category_spending = df_debit.groupby('Category')['Amount'].sum().reset_index()

# Aggregate spending by subcategory (Category + Name)
subcategory_spending = df_debit.groupby(['Category', 'Name'])['Amount'].sum().reset_index()

# Initialize Dash App
app = Dash(__name__, server=server)

@server.route('/api/savings-plan', methods=['GET'])
def get_savings_plan():
    # Assuming monthly_spending and savings_plan_df are already defined and available
    total_spending = df_debit['Amount'].sum()  # Total spending calculation
    recommended_savings = total_spending * 0.20  # 20% of total spending as recommended savings

    # Create a dictionary for spending categories
    category_spending = df_debit.groupby('Category')['Amount'].sum().to_dict()

    # Prepare response data
    savings_data = {
        "recommended_savings": recommended_savings,
        "last_month_spending": total_spending,
        "spending_categories": category_spending
    }

    return jsonify(savings_data)



# Layout of the dashboard
app.layout = html.Div([
    html.H1("Interactive Financial Report"),

    # First Pie Chart (Overall Category Spending)
    dcc.Graph(id='category-pie-chart',
              figure=px.pie(category_spending, values='Amount', names='Category',
                            title="Category-Wise Spending", hole=0.4)),

    # Second Pie Chart (Drill-down Subcategory Spending)
    dcc.Graph(id='subcategory-pie-chart')
])

# Callback to update the second pie chart dynamically
@app.callback(
    Output('subcategory-pie-chart', 'figure'),
    Input('category-pie-chart', 'clickData')
)
def update_subcategory_pie(clickData):
    if clickData is None:
        return px.pie(title="Click on a category to see subcategories", hole=0.4)

    # Extract clicked category
    selected_category = clickData['points'][0]['label']

    # Filter subcategories for the selected category
    sub_df = subcategory_spending[subcategory_spending['Category'] == selected_category]

    # Create subcategory pie chart
    fig = px.pie(sub_df, values='Amount', names='Name',
                 title=f"Spending Breakdown: {selected_category}", hole=0.4)

    return fig


# Define savings plan based on Book1.csv data

# Assuming income is not in the dataset, simulate a fixed income per month
if 'Income' not in df.columns:
    monthly_spending['Income'] = 7000  # Fixed income assumption

# Calculate recommended savings (20% of income)
monthly_spending['Recommended Savings'] = monthly_spending['Income'] * 0.20

# Calculate net savings (remaining funds after spending)
monthly_spending['Net Savings'] = monthly_spending['Income'] - monthly_spending['Amount']

# Function to generate savings plan recommendations
def generate_savings_plan(data):
    savings_plan = []
    for index, row in data.iterrows():
        plan = {
            "Month": row['Year-Month'],
            "Recommended Savings ($)": round(row['Recommended Savings'], 2),
            "Net Savings ($)": round(row['Net Savings'], 2),
            "Status": "✅ On Track" if row['Net Savings'] >= row['Recommended Savings'] else "⚠️ Consider Cutting Expenses"
        }
        savings_plan.append(plan)
    return pd.DataFrame(savings_plan)

# Generate savings plan
savings_plan_df = generate_savings_plan(monthly_spending)


# Function to generate savings plan recommendations in a formatted output
def generate_savings_plan_text(data):
    output = "\n💰 !!Savings Plan Recommendation!! 💰\n"
    for index, row in data.iterrows():
        recommended_savings = row['Recommended Savings']
        net_savings = row['Net Savings']
        status = "✅ You're on track with your savings plan!" if net_savings >= recommended_savings else "⚠️ Consider reducing discretionary expenses to save more."

        output += f"""
        🔹 <strong>{row['Year-Month']}</strong>
        <p><strong>Recommended Monthly Savings:</strong> ${recommended_savings:.2f}</p>
        <p><strong>Your Estimated Savings This Month:</strong> ${net_savings:.2f}</p>
        <p>{status}</p>
        """

    return output

# Generate formatted savings plan text
savings_plan_text = generate_savings_plan_text(monthly_spending)

# Print the savings plan in a formatted manner
from IPython.core.display import display, HTML
display(HTML(savings_plan_text))
