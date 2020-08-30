import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
	//just want to pull out the deleteTransaction function from GlobalState
	const { deleteTransaction } = useContext(GlobalContext);

	// need to determine a t/- sign for deposit/withdrawal
	const sign = transaction.amount < 0 ? '-' : '+';
	return (
		// we use the className of the li to do the styling of red/green for transaction
		// minus gives red, plus gives green
		//we want to set the className based on the amount
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}

			<span>
				{/* use Math.abs to get rid of the extra "-" sign from the global state */}
				{sign}${numberWithCommas(Math.abs(transaction.amount))}
			</span>
			{/* modified from transaction.id to transaction._id as mongodb in backend saves id as _id */}
			<button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">
				x
			</button>
		</li>
	);
};
