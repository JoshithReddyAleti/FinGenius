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

# Define API endpoints
@server.route('/api/category-spending', methods=['GET'])
def get_category_spending():
    # Return category spending as JSON
    return jsonify(category_spending.to_dict(orient='records'))


@server.route('/api/subcategory-spending', methods=['GET'])
def get_subcategory_spending():
    category = request.args.get('category')  # Get the 'category' parameter from the query string
    if not category:
        return {"error": "Category not provided"}, 400  # Return an error if the category is not passed
    
    # Your existing logic to fetch and return subcategory data based on the category
    # Example:
    subcategory_data = get_subcategory_data(category)
    
    return {"subcategory_data": subcategory_data}  # Replace with actual data response


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

# Run Dash app (ensure mode='external' is removed)
if __name__ == '__main__':
    app.run_server(debug=True)  # Corrected: no mode='external'
