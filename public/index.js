// Get references to the necessary DOM elements
const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const resetBtn = document.getElementById('reset-btn');
let total = 0;

// Handle form submission
expenseForm.addEventListener('submit', function (e) {
    e.preventDefault(); 
    
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value); // Parse amount as float

    // Validate inputs
    if (description.trim() === '' || amount <= 0 || isNaN(amount)) {
        alert('Please enter a valid description and a positive amount.');
        return;
    }

    const category = categoryInput.value;

    // Add expense to the list and reset form fields
    addExpenseToList(description, amount, category);
    descriptionInput.value = '';
    amountInput.value = '';
    categoryInput.value = 'food'; // Reset to default category
    console.log(`Description: ${description}, Amount: ${amount}, Category: ${category}`);
});

function deleteExpense(id) {
    fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        // Remove expense from list in the DOM
        document.getElementById(`expense-${id}`).remove();
        total -= amount; // Update total
        document.getElementById('total').textContent = total.toFixed(2);
    })
    .catch(error => console.error('Error deleting expense:', error));
}
// Function to add an expense to the list
function addExpenseToList(description, amount, category) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.textContent = `${description} - $${amount.toFixed(2)} (${category})`; // Format amount to two decimal places

     // Add delete button to each expense item
     const deleteBtn = document.createElement('button');
     deleteBtn.textContent = 'Delete';
     deleteBtn.onclick = function () {
         deleteExpense(id);
     };
     li.appendChild(deleteBtn);
    expenseList.appendChild(li);

    // Update total
    total += amount; // Add amount to total
    document.getElementById('total').textContent = total.toFixed(2); // Display total
}

// Reset button functionality
resetBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to reset all expenses?')) {
        document.getElementById('expense-list').innerHTML = ''; // Clear the expense list
        total = 0; // Reset total to 0
        document.getElementById('total').textContent = total.toFixed(2); // Reset total display
    }
});

// Function to load expenses from the server
function loadExpenses() {
    fetch('http://localhost:3000/expenses')
        .then(response => {
            if (!response.ok) { // Check for response errors
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(expense => {
                addExpenseToList(expense.description, parseFloat(expense.amount), expense.category); // Ensure amount is a float
                total += parseFloat(expense.amount); // Update total
            });
            document.getElementById('total').textContent = total.toFixed(2); // Display updated total
        })
        .catch(error => {
            console.error('Error loading expenses:', error);
            alert('Failed to load expenses. Please try again later.'); // Notify user of the error
        });
}

// Load expenses on page load
window.onload = loadExpenses;
