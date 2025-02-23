from dash import Dash, dcc, html
from dash.dependencies import Input, Output
import pandas as pd
import plotly.express as px

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
app = Dash(__name__)

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
