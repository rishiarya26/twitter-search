export default function Search({getItems, onTermChange, query}) {

    const onClickSearch = (e)=>{
      e.preventDefault();
      getItems();
    }

    const onChangeTerm =(e)=>{
      e.preventDefault();
      onTermChange(e?.currentTarget?.value)
  }
  return (
    <div className='search-container'>
      <form className='flex-row search-box' onSubmit={onClickSearch}>
        <div className='seach-bar'> 
          <input
            className='input-box'
            id="Search"
            value={query}
            onChange={onChangeTerm}
            type="text"
            placeholder='Search Tweets'
            required={true}
          />
        </div>
        <div className='search-button'>
          <button type='submit' text="Search" >
           Search
          </button>    
        </div>
        </form>
    </div>
  );
}
