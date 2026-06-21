const Transaction = require('../Models/transactions.js');
const axios = require('axios');
require('dotenv').config();
const key = process.env.ETHERSCAN_API_KEY;

exports.getTransactionHistory =  async (req, res) => {
    const { address } = req.params;

    try {
        //fetch transactions performed on given address
      const response = await axios.get(
        `https://api.etherscan.io/v2/api?address=${address}&sort=asc&offset=10&page=1&endblock=99999999&startblock=0&action=txlist&module=account&chainid=1&apikey=${key}`
      );
  
    console.log(response.data);

        // Check for API errors
        if (response.data.status !== '1') {
            console.log('Etherscan API error:', response.data.message);
            return res.status(500).send('Currently no transactions');
        }

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