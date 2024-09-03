const Transaction = require('../Models/transactions.js');
const Price = require('../Models/ethereumPrice');

exports.getExpenses =  async (req, res) => {
    const { address } = req.params;
    try {
      const transactions = await Transaction.findOne({ address });
      if (!transactions) {
        return res.status(404).send('Transactions not found');
      }
  
      const totalExpenses = transactions.transactions.reduce((acc, tx) => {
        const gasCost = (tx.gasUsed * tx.gasPrice) / 1e18;
        return acc + gasCost;
      }, 0);
  
      const latestPrice = await Price.findOne().sort({ timestamp: -1 });
  
      res.json({ totalExpenses, ethPrice: latestPrice.priceInINR });

    } catch (error) {
      res.status(500).send('Error calculating expenses');
    }
};
  