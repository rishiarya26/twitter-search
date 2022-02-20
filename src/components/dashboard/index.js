import { useCallback, useEffect, useRef, useState } from "react";
import { getSearchResults } from "../../sources";
import { localStorage } from "../../utils/storage";
import Card from "../card";
import Tabs from "../commons/tab";
import Favourite from "../favourite";
import Search from "../search";

const Dashboard = ()=>{
const [items, setItems] = useState([]);
const [favourites, setFavourites] = useState([]);
const [selectedTabIndex, setSelectedTabIndex] = useState(0);
const [loading, setLoading] = useState(false);
const [nextToken, setNextToken] = useState(null);
const [query, setQuery] = useState('');
const [hasMore, setHasMore] = useState(true);
const [error, setError] = useState(false)

const observer = useRef();

const lastItemInView = useCallback((node)=>{
  if(loading) return;
  observer.current = new IntersectionObserver(enteries =>{
       if(enteries[0]?.isIntersecting && hasMore){
         addItems();
       }
  });
  if(node) observer?.current?.observe(node);
},[loading, hasMore])

const getItems = async() =>{
    setLoading(true);
    setItems([]);
    setError(false);
    let response;
  try{ 
   response =  await getSearchResults(query);
    if(response?.data?.data.length > 0){ 
      setHasMore(true);
      setItems(response?.data?.data);
      setNextToken(response?.data?.meta?.next_token)
    }else{
      setError(true)
    }
    setLoading(false);
  }catch(e){
    setError(true)
    setHasMore(false);
    setLoading(false);
  }
}

const addItems = async()=>{
  setLoading(true);
  try{ 
    const response =  await getSearchResults(query, nextToken);
    const newItems = response?.data?.data;
    if(response?.data?.data?.length > 0){ 
      setHasMore(true);
      let updateItems = [...items];
      updateItems = updateItems?.concat(newItems)
      setItems(updateItems);
      setNextToken(response?.data?.meta?.next_token)
    }else{
      setHasMore(false);
    }
    setLoading(false);
  }catch(e){
    setHasMore(false);
    setLoading(false);
    console.log('error in search api',e);
  }
}

const toChangeTab =(index)=>{
    setSelectedTabIndex(index);
}

const getFavouriteItems =()=>{
        try{  
            const favItems = localStorage.get('favourite-tweets');
            favItems && setFavourites(favItems);
            setLoading(false);
          }
          catch(e){
            setLoading(false);
            setFavourites(null);
            console.log('error fetching items from localhost',e)
          }
}

useEffect(()=>{
    if(selectedTabIndex === 1){
        setLoading(true);
        setFavourites([]);
        getFavouriteItems();
    }
},[selectedTabIndex])

const onTermChange =(term)=>{
  setQuery(term);
}

const tabItems = {display:['Search','Favourites']};
const comp = {
  0 :  <>
        <Search getItems={getItems} query={query} onTermChange={onTermChange}/>
          <div className='card-container'>
            { items?.length > 0 && items.map((item,id)=>(
             (id+1 === items.length) ? 
             <div ref={lastItemInView} key={id}> 
              <Card data={item} type='tweets'/> 
             </div> :
              <Card key={id} data={item} type='tweets'/>
            ))} 
            { loading && <div className='center-loading'>loading...</div>}
            { error && <div className='center'>No Results Found</div>}
          </div>
       </>,
  1 :  <Favourite 
         toChangeTab={toChangeTab}
         items={favourites}
         loading={loading} 
         getFavouriteItems={getFavouriteItems}
        />
 }

   return(
       <>
       <div className='container'>
           <div className='sub-container'>
            <Tabs
              items={tabItems}
              selectedIndex={selectedTabIndex}
              onTabChange={toChangeTab}
            />
            {comp?.[selectedTabIndex]}
           </div>
       </div>
       </>
   )
}

export default Dashboard;