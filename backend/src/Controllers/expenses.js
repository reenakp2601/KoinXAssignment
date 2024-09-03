const Transaction = require('../Models/transactions.js');
const Price = require('../Models/ethereumPrice');

exports.getExpenses =  async (req, res) => {
    const { address } = req.params;
    try {
        //get all transactions performed on given address
      const transactions = await Transaction.findOne({ address });

      //if no transactions found or address does not exist
      if (!transactions) {
        return res.status(404).send('Transactions not found');
      }
      
      // calculating expenses = gasUsed*gasPrice divided by 1e18
      const totalExpenses = transactions.transactions.reduce((acc, tx) => {
        const gasCost = (tx.gasUsed * tx.gasPrice) / 1e18;
        return acc + gasCost;
      }, 0);
      
      // getting latest price by sorting in descending order of timestamp
      const latestPrice = await Price.findOne().sort({ timestamp: -1 });
  
     if(totalExpenses && latestPrice) res.json({ totalExpenses, ethPrice: latestPrice.priceInINR });
     else res.send("currently there are no expenses");

    } catch (error) {
      res.status(500).send('Error calculating expenses');
      console.log('Error :', error);
    }
};
  