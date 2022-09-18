import { useEffect, useState } from 'react' 
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection'

// components
import ExpensesList from './ExpensesList';
import CreateForm from './CreateForm';
import Filter from './Filter';

// styles
import './Home.css'

export default function Home() {
  const [currentFilter, setCurrentFilter] = useState('All')
  const [expensesTotal, setExpensesTotal] = useState(0)
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'expenses',
    ['uid', '==', user.uid],
    ['date', 'desc']
  )

  const changeFilter = (newFilter) => {
   setCurrentFilter(newFilter)
  }

  const expenses = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'All':
        return true;
      case '支出':
      case '収入':
        return document.category === currentFilter;
      case '光熱費':
      case '食費雑費':
      case '本、映画':
      case 'その他収入':
      case 'その他支出':
        return document.accountTitle === currentFilter;
      default:
        return true;
    }
  }) : null

  useEffect(() => {
    const calcTotal = async() => {
      let sum = 0
      const expenseAmountList = await expenses ? expenses.map((expense) => expense.amount.split(',')) : null
      await expenseAmountList.forEach(expenseAmount => {
        let number = Number(expenseAmount.join(''))
          sum += number
      })
      setExpensesTotal(Number(sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    }
    calcTotal()
  }, [expenses])

  return (
    <div className='home-container'>
      <div className='home-filter'>
        {documents && (
          <Filter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />
        )}
        <div className='home-total'>
          <p>Total: </p>
          <span>{expensesTotal}</span>
        </div>
      </div>
      <div className='home-content'>
        <div className='list'>
        <h2 className='page-title'>Expense list</h2>
        {error && <p className='error'>{error}</p>}
        {expenses && <ExpensesList expenses={expenses} />}
        </div>
      <div className='create'>
        <CreateForm uid={user.uid}/>
      </div>
      </div>
    </div>
  )
}
