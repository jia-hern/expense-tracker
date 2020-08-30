import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
	// 1st variable is the name of state, 2nd variable to manipulate the state
	//whats inside the useState bracket is the default value
	const [ text, setText ] = useState('');
	const [ amount, setAmount ] = useState(0);

	//get the add transaction function/action from the global state
	const { addTransaction } = useContext(GlobalContext);

	const onSubmit = (e) => {
		e.preventDefault();
		const newTransaction = {
			id     : Math.floor(Math.random() * 100000000),
			//we already defined text and amount on top
			//below is the shortcut way of writing:
			// text : text, amount : amount
			text,
			//need to change amount from string to number for it to be summed up via reduce in Balance. parseInt(amount) works too
			amount : +amount
			//text and amount defined above is linked to the form below, which is used to update the text and amount in this function
		};
		addTransaction(newTransaction);
	};

	return (
		<React.Fragment>
			<h3>Add new transaction</h3>
			<form onSubmit={onSubmit}>
				<div className="form-control">
					<label htmlFor="text">Text</label>
					{/* connect the form to the state by value = ...  */}
					{/* use onChange to listen for changes to update the state  */}
					{/* (e)=> setText(e.target.value) sets the state using the value of the input field */}
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter text..."
					/>
				</div>
				<div className="form-control">
					<label htmlFor="amount">
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter amount..."
					/>
				</div>
				<button className="btn">Add transaction</button>
			</form>
		</React.Fragment>
	);
};
