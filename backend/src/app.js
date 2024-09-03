const express = require('express');
const mongoose = require('mongoose');
const transactionsController = require('./Controllers/transactions');
const expensesController = require('./Controllers/expenses.js')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/transactions/:address', transactionsController.getTransactionHistory);
app.get('/expenses/:address', expensesController.getExpenses);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));