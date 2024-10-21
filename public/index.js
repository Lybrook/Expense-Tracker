const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const resetBtn = document.getElementById('reset-btn');
let total = 0;

expenseForm.addEventListener('submit', function (e) {
    e.preventDefault(); 
    
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description.trim() === '' || amount <= 0 || isNaN(amount)) {
        alert('Please enter a valid description and a positive amount.');
        return;
    }

    const category = categoryInput.value;
    

    const newExpense = {
        description: description,
        amount: amount.toFixed(2), 
        category: category
    };

    fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExpense)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(addedExpense => {
        addExpenseToList(addedExpense.description, parseFloat(addedExpense.amount), addedExpense.category, addedExpense.id);

       
        total += parseFloat(addedExpense.amount); // Add amount to total
        document.getElementById('total').textContent = total.toFixed(2);

        
        descriptionInput.value = '';
        amountInput.value = '';
        categoryInput.value = 'food';
    })
    .catch(error => {
        console.error('Error adding expense:', error);
        alert('Failed to add expense. Please try again later.');
    });
});

function deleteExpense(id, amount) {
    fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            document.getElementById(`expense-${id}`).remove();
            
            total -= amount; 
            document.getElementById('total').textContent = total.toFixed(2);
        } else {
            document.getElementById(`expense-${id}`).remove();
            total -= amount;
            document.getElementById('total').textContent = total.toFixed(2);
        }
    })
    .catch(error => {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense. Please try again later.');
    });
}


let expenseId = 0;


function addExpenseToList(description, amount, category, id = null) {
    if (!id) {
        expenseId++;
        id = expenseId; 
    }

    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.id = `expense-${id}`;

    li.textContent = `${description} - $${amount.toFixed(2)} (${category})`; 

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function () {
        deleteExpense(id, amount); 
    };
    li.appendChild(deleteBtn);
    expenseList.appendChild(li);

   
    total += amount; 
    document.getElementById('total').textContent = total.toFixed(2); 
}

resetBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to reset all expenses?')) {
        document.getElementById('expense-list').innerHTML = '';
        total = 0; 
        document.getElementById('total').textContent = total.toFixed(2); 
    }
});

function loadExpenses() {
    fetch('http://localhost:3000/expenses')
        .then(response => {
            if (!response.ok) { 
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(expense => {
                addExpenseToList(expense.description, parseFloat(expense.amount), expense.category, expense.id);
            });
            
        })
        .catch(error => {
            console.error('Error loading expenses:', error);
            alert('Failed to load expenses. Please try again later.'); 
        });
}

window.onload = loadExpenses;
