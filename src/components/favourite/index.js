import Card from "../card"

const Favourite = ({items, toChangeTab, loading, getFavouriteItems})=>{
    if(items?.length === 0){
        return (
            <div className='flex-column center'>
                <div>No Favourite Tweets Present</div>
                <div className='color-blue' onClick={()=>{toChangeTab(0)}}>Search Tweets</div>
            </div>
        )
    }
    return(
        <>
        {!loading ? 
        <>
         <div className='card-container'>
             {items?.map((item)=>(
             <Card 
              key={item.id} 
              data={item} 
              type='fav-tweets' 
              getFavouriteItems={getFavouriteItems}
             />
            ))} 
        </div>
        </>
        :
        <div className='center'>loading...</div>
        }
       </>
    )
}

export default Favourite;