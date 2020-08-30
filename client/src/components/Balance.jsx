import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Balance = () => {
	const { transactions } = useContext(GlobalContext);
	//extract all the amounts from the state into an array
	const amounts = transactions.map((transaction) => transaction.amount);
	//console.log(amounts)

	//sum up all the amounts
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	return (
		<React.Fragment>
			<h4>Your Balance</h4>
			<h1>${numberWithCommas(total)}</h1>
		</React.Fragment>
	);
};
