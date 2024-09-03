const Transaction = require('../Models/transactions.js');
const axios = require('axios');

const key = process.env.ETHERSCAN_API_KEY;
const Address = process.env.address;

exports.getTransactionHistory =  async (req, res) => {
    const { address } = req.params;

    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${key}`
    );
  
      const transactions = response.data.result;
  
      // Check for existing transactions and update if needed
    const existingTransactions = await Transaction.findOne({ address });

    if (existingTransactions) {
      // Compare fetched vs existing transactions
      const newTransactions = transactions.filter(
        fetchedTx => !existingTransactions.transactions.some(existingTx => fetchedTx.hash === existingTx.hash)
      );

      if (newTransactions.length > 0) {
        existingTransactions.transactions.push(...newTransactions);
        await existingTransactions.save();
        console.log(`Updated transactions for address ${address}.`);
        return res.json(existingTransactions.transactions); // Send updated data
      } else {
        console.log(`No new transactions found for address ${address}.`);
        return res.json(existingTransactions.transactions); // Send existing data
      }
    }
    
      // Store in MongoDB
      const userTransactions = new Transaction({ address, transactions });
      await userTransactions.save();
  
      res.json(transactions);
    } catch (error) {
      console.error('Error :', error);
      res.status(500).send('Error fetching transactions');
    }
  };