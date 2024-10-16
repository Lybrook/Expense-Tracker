const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');

expenseForm.addEventListener('submit', function (e) {
    e.preventDefault(); 
    
    console.log('Form submitted!');
});
expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const description = descriptionInput.value;
    const amount = amountInput.value;
    const category = categoryInput.value;

    addExpenseToList(description, amount, category);

    descriptionInput.value = '';
    amountInput.value = '';
    categoryInput.value = 'food';
    console.log(`Description: ${description}, Amount: ${amount}, Category: ${category}`);
});
function addExpenseToList(description, amount, category) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.textContent = `${description} - $${amount} (${category})`;
    expenseList.appendChild(li);
}
