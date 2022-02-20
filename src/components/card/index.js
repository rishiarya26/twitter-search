import { useEffect, useState } from "react"
import { localStorage } from "../../utils/storage";
import ActionBar from "./action-bar";
import Detail from "./details";
import UserInfo from "./user-info";

const Card = ({data, type, getFavouriteItems}) =>{
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFav, setIsFav] = useState(false);

    const checkInitialIsFav = {
        'tweets' : ()=>{
            let favItems =localStorage.get('favourite-tweets');
            if(favItems){
            const itemIsFav = favItems?.some((item)=>{
                if(item?.id === data?.id){
                    return true;
                }else{
                return false;
                }
            }) 
            setTimeout(()=>{
                setIsFav(itemIsFav);
            },[100]) 
          }else{
            setTimeout(()=>{
                setIsFav(false);
            },[100]) 
          }
        },
        'fav-tweets' : ()=>{
            setIsFav(true);
        }
    }

    useEffect(()=>{
        const toSetInitalIsFav = checkInitialIsFav?.[type];
        toSetInitalIsFav && toSetInitalIsFav();
    },[])

    const toggleExpand =()=>{
        setIsExpanded(!isExpanded);
    }

    const toggleFav = (value)=>{
        setIsFav(value)
    }

    return(
     <>   
     <div className='card-preview' key={data?.id}>
       <UserInfo data={data}/>
       <div className='desc'>{data?.text}</div> 
        <ActionBar
         isExpanded={isExpanded}
         toggleExpand={toggleExpand}
         isFav={isFav}
         getFavouriteItems={getFavouriteItems}
         toggleFav={toggleFav}
         type={type}
         data={data}
        /> 
         {isExpanded ? 
           <Detail 
             lang={data?.lang} 
             location={data.user?.location}
             followersCount={data.user?.public_metrics?.followers_count}
             tweetsCount={data.user?.public_metrics?.tweet_count}
             followingCount={data.user?.public_metrics?.following_count}
             retweetCount={data?.public_metrics?.retweet_count}
             likeCount={data?.public_metrics?.like_count}
           /> : ''}
     </div>
     </>
    )
}

export default Card;