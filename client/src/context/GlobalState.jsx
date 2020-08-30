import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
//Initial State
const initialState = {
	transactions : [],
	//used for intial testing to see if it can be displayed correctly
	// transactions : [
	// 	{ id: 1, text: 'Flower', amount: -20 },
	// 	{ id: 2, text: 'Salary', amount: 300 },
	// 	{ id: 3, text: 'Book', amount: -10 },
	// 	{ id: 4, text: 'Camera', amount: 150 }
	// ]
	error        : null,
	loading      : true
};

//Create context like a store that keep the states
export const GlobalContext = createContext(initialState);

// so that other files can have access to the store/state

//to wrap all the components from App.js(in a provider component) so that they can access the store/states -> components from App.js are children to provider component
//Provider component
export const GlobalProvider = ({ children }) => {
	//dispatch is to call a reducer action
	const [ state, dispatch ] = useReducer(AppReducer, initialState);

	//Actions - so that have the functionality of delete when click "x" on that item

	//this action allows us to fetch data from the backend to update the states
	async function getTransactions() {
		try {
			// no need the http://localhost:5000 as we put it as proxy in package.json
			const res = await axios.get('/api/v1/transactions');
			//res.data is the everything that is returned from the get req we see in postman -> so we need a .data after res.data to access the transactions
			// res.data.data
			dispatch({
				type    : 'GET_TRANSACTION',
				payload : res.data.data
			});
		} catch (error) {
			dispatch({
				type    : 'TRANSACTION_ERROR',
				payload : error.response.data.error
			});
		}
	}

	//this fn takes in an id as we need to know which transaction to delete
	async function deleteTransaction(id) {
		try {
			// axios.delete removes the transaction to be deleted in the backend
			await axios.delete(`/api/v1/transactions/${id}`);
			//this removes the transaction in the frontend
			dispatch({
				type    : 'DELETE_TRANSACTION',
				payload : id
				// then go to Appreducer to add the case which matches the action type of 'DELETE_TRANSACTION'
			});
		} catch (error) {
			dispatch({
				type    : 'TRANSACTION_ERROR',
				payload : error.response.data.error
			});
		}
	}
	//this action is to add a new transaction
	async function addTransaction(transaction) {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/v1/transactions', transaction, config);
			dispatch({
				type    : 'ADD_TRANSACTION',
				payload : res.data.data
				// then go to Appreducer to add the case which matches the action type of 'ADD_TRANSACTION'
			});
		} catch (error) {
			dispatch({
				type    : 'TRANSACTION_ERROR',
				payload : error.response.data.error
			});
		}
	}

	//return the provider component
	// value={{transactions:state.transactions}} --> to access whats the transactions defined in the state above
	return (
		<GlobalContext.Provider
			value={{
				transactions      : state.transactions,
				error             : state.error,
				loading           : state.loading,
				getTransactions,
				//need to pass the delete function down too
				deleteTransaction,
				//need to pass the add function down too
				addTransaction
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
