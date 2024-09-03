Setup
Prerequisites
Node.js (version 20.13.1)
npm (version 10.5.2)


Installation
1) Clone the repository:

git clone https://github.com/reenakp2601/KoinXAssignment.git
cd backend

2) Install dependencies npm install

3) Starting server npm run dev

API Endpoints
1) fetch transactions performed on an address
--URL: /transcations/:address
--Method: GET
--Query Parameters: address of user
--Response: transaction data or error message(if no transactions)

2) calculate total expenses of a user and current ethereum price
--URL: /expenses/:address
--Method: GET
--Query Parameters: address of user
--Response: calculated expenses data or error message(if no transactions)

API Calls 
1) fetch ethereum price after every 10 minutes
