import { useState } from 'react' 
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
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'expenses',
    ['uid', '==', user.uid],
    ['date', 'asc']
  )

  const changeFilter = (newFilter) => {
   setCurrentFilter(newFilter)
  }

  const expenses = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'All':
        console.log(currentFilter)
        return true;
      case '支出':
      case '収入':
        console.log(currentFilter)
        return document.category === currentFilter;
      case '光熱費':
      case '食費雑費':
      case '本、映画':
      case 'その他-収入':
      case 'その他-支出':
        console.log(currentFilter)
        return document.accountTitle === currentFilter;
      default:
        return true;
    }
  }) : null

  return (
    <div className='home-container'>
      <div className='home-filter'>
        {documents && (
          <Filter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />
        )}
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
