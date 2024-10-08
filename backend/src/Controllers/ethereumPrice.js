const Price = require('../Models/ethereumPrice');
const axios = require('axios');

const fetchEthPrice = async () => {
    try {
        // fetch current ethereum price
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
      const priceInINR = response.data.ethereum.inr;
  
      // Store in MongoDB
      const ethPrice = new Price({ priceInINR });
      await ethPrice.save();
  
      console.log(`Stored ETH price: ₹${priceInINR}`);
    } catch (error) {
      console.log('Error fetching Ethereum price', error);
    }
  };
  
module.exports = fetchEthPrice;