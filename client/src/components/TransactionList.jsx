import React, { useContext, useEffect } from 'react';
//bring global state in
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
	// we use useContext to pull out what we need from the globalstate
	// const context = useContext(GlobalContext);
	// console.log(context);
	// from console.log we can see that we can access all the transactions from GlobalState

	//instead of using context.transacitions to access the transactions, we can use destructuring to call transactions directly
	const { transactions, getTransactions } = useContext(GlobalContext);
	useEffect(() => {
		getTransactions();
		//eslint-disable-next line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<h3>History</h3>
			<ul className="list">
				{/* transactions is an array, so use map to show all the elements  */}
				{transactions.map((transaction) => (
					// for the Transaction component to know which transaction to render, we need to pass in the transactions as props
					// need a unique key for each component
					<Transaction key={transaction.id} transaction={transaction} />
				))}
			</ul>
		</React.Fragment>
	);
};
