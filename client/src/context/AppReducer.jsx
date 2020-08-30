//to specify the application state changes in response to certain actions to the store/context

export default (state, action) => {
	switch (action.type) {
		case 'GET_TRANSACTION':
			return {
				...state,
				//setting loading to false stops the spinning thing at the page
				loading      : false,
				transactions : action.payload
			};
		case 'DELETE_TRANSACTION':
			return {
				...state,
				// we just want to return the transactions that are not deleted
				transactions : state.transactions.filter((transaction) => transaction._id !== action.payload)
			};
		case 'ADD_TRANSACTION':
			return {
				...state,
				// get the initial transactions with the spread operator -> ...state.transactions
				//action.payload is the new transaction that is added
				//so we replace transactions with a new array containing the new transactions with the those from the initial state
				transactions : [ ...state.transactions, action.payload ]
			};
		case 'TRANSACTION_ERROR':
			return {
				...state,
				error : action.payload
			};
		default:
			return state;
	}
};
