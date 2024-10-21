# Expense Tracker

## Project Overview
The **Expense Tracker** is a web application that helps users manage and track their daily expenses. The app allows users to input their expenses, categorize them, and view the total amount spent. This application is built with **HTML**, **CSS**, **JavaScript**, and a custom-built **API** with **JSON Server** for data persistence.

## Features
- **Add Expenses**: Users can add new expenses by providing a description, amount, and selecting a category.
- **Delete Expenses**: Users can remove expenses from the list.
- **View Total Expense**: The total sum of all entered expenses is displayed.
- **Categories**: Expenses are categorized into predefined categories such as food, transport, utilities, entertainment, and others.
- **Persistent Data**: The app uses a local JSON file (mocked via **JSON Server**) to store expenses and loads them when the page is refreshed.
- **Responsive Design**: The layout is responsive and works well across devices of various screen sizes.

## Technologies Used
- **HTML5**: Provides the structure and elements of the webpage.
- **CSS3**: Responsible for the styling, layout, and responsive design.
- **JavaScript**: Handles the app’s interactivity and logic for adding, deleting, and updating expenses.
- **JSON Server**: Used to create a mock REST API to handle expense data (e.g., loading, deleting expenses).
- **Git/GitHub**: Version control system to track changes and collaborate on the project.

### Prerequisites
- **Node.js**: Make sure Node.js is installed on your system.
- **JSON Server**: You'll need to install JSON Server globally to mock an API for expenses.
  
### Steps to Run the Application

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd expense-tracker
    ```

3. **Install JSON Server** (if not already installed):
    ```bash
    npm install -g json-server
    ```

4. **Run the JSON Server**:
    ```bash
    json-server --watch db.json --port 3000
    ```
    - This will start the JSON server, which serves the `db.json` file that stores your expenses.

5. **Open the Project in a Browser**:
    - Open `index.html` in your preferred browser.
    - You can also use a live server (such as the Live Server extension in VS Code) to view the project locally.

### Usage

1. **Adding an Expense**: Fill in the description, amount, and category, then click **"Add Expense"**.
2. **Deleting an Expense**: Press the **"Delete"** button next to any expense in the list to remove it.
3. **Reset Expenses**: Click **"Reset Expenses"** to clear all expenses.
4. **Data Persistence**: Your data will be saved in the `db.json` file and automatically reloaded when the page is refreshed.
