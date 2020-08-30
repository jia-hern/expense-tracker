//keep all the methods that will use our model to interact with our database

const Transaction = require('../models/Transaction.model');
//when we use mongoose they return a promise, so we use async await

//@desc Get all transactions
//@route GET /api/v1/transactions
//@access Public
exports.getTransactions = async (req, res, next) => {
	// res.send('GET transactions');
	try {
		// .find() to get all the transactions
		const transactions = await Transaction.find();
		return res.status(200).json({
			success : true,
			count   : transactions.length,
			data    : transactions
		});
	} catch (error) {
		return res.status(500).json({
			success : false,
			error   : 'Server error'
		});
	}
};

//@desc Add transaction
//@route POST /api/v1/transactions
//@access Public
exports.addTransaction = async (req, res, next) => {
	// res.send('POST transaction');
	//before we can use req.body..., need to add in a body parser middleware in our server.js
	try {
		const { text, amount } = req.body;
		const transaction = await Transaction.create(req.body);

		return res.status(201).json({
			success : true,
			data    : transaction
		});
	} catch (error) {
		// console.log(error);
		//see the console.log and the error has that name.
		//we just want to take the properties we need from the error
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map((val) => val.message);
			return res.status(400).json({
				success : false,
				error   : messages
			});
		} else {
			return res.status(500).json({
				success : false,
				error   : 'Server error'
			});
		}
	}
};

//@desc Delete transaction
//@route DELETE /api/v1/transaction/:id
//@access Public
exports.deleteTransaction = async (req, res, next) => {
	// res.send('DELETE transaction');
	try {
		const transaction = await Transaction.findById(req.params.id);
		//if there are no transaction of that id
		if (!transaction) {
			return res.status(404).json({
				success : false,
				error   : 'No transaction found'
			});
		}
		await transaction.remove();
		return res.status(200).json({
			success : true,
			data    : {}
		});
	} catch (error) {
		return res.status(500).json({
			success : false,
			error   : 'Server error'
		});
	}
};
