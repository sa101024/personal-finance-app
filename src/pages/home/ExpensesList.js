import { useFirestore } from '../../hooks/useFirestore'

// styles
import './ExpensesList.css'

export default function ExpensesList({ expenses }) {
  const { deleteDocument } = useFirestore('expenses')

  return (
    <ul className='expenses'>
      {expenses && expenses.map((expense) => (
        <li
          className={expense.category === '収入' ? 'content-income' : 'content-expense'}
          key={expense.id}
        >
          <p className='date'>{expense.date}</p>
          <p className='category'>{expense.category}</p>
          <p className='accountTitle'>{expense.accountTitle}</p>
          <p className='amount'>{expense.amount}</p>
          <p className='details'>{expense.details}</p>
          <button onClick={() => deleteDocument(expense.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}
