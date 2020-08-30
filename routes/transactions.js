const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transaction.controller');

// router.get('/', (req, res) => res.send('Hello'));
//when we go to '/' in url -> process the get req and call that method(which does the res.send)
router.route('/').get(getTransactions).post(addTransaction);

//for delete we need to identify the item to delete so need to pass in the id
router.route('/:id').delete(deleteTransaction);

module.exports = router;
