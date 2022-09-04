import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import ExpensesList from './ExpensesList';
import CreateForm from './CreateForm';

// styles
import './Home.css'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    // 'expenses'
    'expenses',
    ['uid', '==', user.uid],
    ['date', 'asc']
  )

    return (
    <div className='home-container'>
      <div className='content'>
        <h2 className='page-title'>Expense list</h2>
        {error && <p className='error'>{error}</p>}
        {documents && <ExpensesList expenses={documents} />}
      </div>
      <div className='create-form'>
        <CreateForm uid={user.uid}/>
      </div>
    </div>
  )
}
