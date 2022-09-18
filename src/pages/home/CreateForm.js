import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import Select from 'react-select';

// options
const categories = [
  { value: 'income', label: '収入', color: '#46BDC6' },
  { value: 'expense', label: '支出', color: '#DD7E6B' }
]
const incomes = [
  { value: 'salary', label: '給料' },
  { value: 'other', label: 'その他' }
]
const expenses = [
  { value: 'rent', label: '家賃' },
  { value: 'utility', label: '光熱費' },
  { value: 'saving', label: '貯金' },
  { value: 'withdraw', label: '引出' },
  { value: 'groceries', label: '食費雑費' },
  { value: 'books', label: '本、映画' },
  { value: 'other', label: 'その他' }
]

export default function CreateForm({ uid }) {
  const { addDocument, response } = useFirestore('expenses')
  const [month, setMonth] =useState('');
  const [date, setDate] =useState('');
  const [details, setDetails] = useState(''); 
  const [amount, setAmount] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [accountTitle, setAccountTitle] = useState(''); 
  const [formError, setFormError] = useState(null);

  // set month
  useEffect(() => {
    if (date !== '') {
      const dateElm = date.split('-')
      const month = dateElm[0] + '-' + dateElm[1]
      setMonth(month)
    }
  }, [date])

  // clear accountTitle
  useEffect(() => {
    if (category !== '') {
      setAccountTitle('')
    }
  }, [category])

  // reject non-numeric values and add commas
  useEffect(() => {
    setFormError(null)
    if (amount.match(/[ぁ-ん]|[ァ-ヴ]|[ｦ-ﾟ]|[a-zA-Z]|[Ａ-Ｚａ-ｚ]/)) {
      setFormError('数字を入力')
      return
    }
    if (amount !== '' && amount.match(/[０-９]/)) {
      setFormError('半角で入力')
      return
    }
    if (amount !== '' && amount.match(/^\d{0,}/)) {
      let convertAmount = amount.trim().replace(/^0/g, '').replace(/,|，|。|、/g, '')
      convertAmount = Number(convertAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setAmount(convertAmount)
    }
  }, [amount])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // error
    setFormError(null)
    if (!category) {
      setFormError('カテゴリーを選択')
      return
    }
    if (!accountTitle) {
      setFormError('費目を選択')
      return
    }

    // switch positive/negative number
    let amountValue = category.value === 'expense' ? ('-' + amount) : amount

    // add new document
    const expense = {
      month,
      id: Math.random(),
      uid,
      date,
      category: category.label,
      accountTitle: accountTitle.label,
      details,
      amount: amountValue
    }
    await addDocument(expense)
  } 

  useEffect(() => {
    if (response.success) {
      setDate('')
      setCategory('')
      setAccountTitle('')
      setDetails('')
      setAmount('')
    }
  }, [response.success])

  return (
    <div className='create-form'>
      <h2 className="page-title form-title">Add an expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </label>
        <label>
          <span>category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
            value={category}
          />
        </label>
        <label>
          <span>account title:</span>
          <Select
            isDisabled={category.value == null ? true : false}
            onChange={(option) => setAccountTitle(option)}
            options={category.value === 'income' ? incomes : expenses}
            value={accountTitle}
          />
        </label>        
        <label>
          <span>details:</span>
          <input
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>amount:</span>
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button className='btn create-btn'>Add Expenses</button>
      </form>
      {formError && <p className='error'>{formError}</p>}
    </div>
  )
}