const filterList = ['All', '支出', '収入', '光熱費', '食費雑費', '本、映画', 'その他収入', 'その他支出']

export default function Filter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }

  return (
    <div className="filter">
      <nav>
        <p>Filter by:</p>
        {filterList.map(f => (
          <button
            key={f}
            className={currentFilter === f ? 'active' : ''}
            onClick={() => handleClick(f)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  )
}