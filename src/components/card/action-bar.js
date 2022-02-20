import { localStorage } from "../../utils/storage";
import Like from "../commons/like";

const ActionBar = ({isExpanded, toggleExpand, isFav, toggleFav, type, getFavouriteItems,data}) =>{

   const toReloadData = {
    'tweets' : ()=>toggleFav(false),
    'fav-tweets' : ()=>getFavouriteItems()
}

   const saveAsFavourite = () =>{
    try{
        let favItems = localStorage.get('favourite-tweets') || [];
        favItems && favItems.splice(0,0,data)
        localStorage.set('favourite-tweets',favItems);
        toggleFav(true);
     }catch(e){
         console.log(e);
     }
 }

 const removeFavourite = ()=>{
     try{
         let favItems = localStorage.get('favourite-tweets') || [];
         let filteredItems;
          if(favItems){
             filteredItems = favItems?.filter((item)=>item?.id !== data.id);
          } 
         localStorage.set('favourite-tweets',filteredItems);
         toReloadData?.[type]();
      }catch(e){
          console.log(e);
      }
 }

 const action = {
    true : removeFavourite,
    false : saveAsFavourite 
}

    return(
        <div className='card-buttons'>
         <div className='expand' onClick={()=>{toggleExpand(!isExpanded)}}>
             {isExpanded ? 'LESS' : 'EXPAND'}
         </div> 
         <div onClick={action[isFav]} className='favourite'>
            <Like isFavourite={isFav}/>  
            <div className='mar-left-2'>FAVOURITE</div>
          </div>
         </div>
    )
}

export default ActionBar;