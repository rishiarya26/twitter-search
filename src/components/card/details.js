import { numberFormatter } from "../../utils/number-formatter";

const Detail = ({lang, location, followersCount,tweetsCount,followingCount,retweetCount,likeCount}) =>{

    const details = [
       {
        'display' : 'RETWEETS',
        'value' : numberFormatter(retweetCount)
       },
       {
        'display' : 'LIKES',
        'value' : numberFormatter(likeCount)
       },
       {
        'display' : 'TWEETS',
        'value' : numberFormatter(tweetsCount)
       },
       {
        'display' : 'FOLLOWING',
        'value' : numberFormatter(followingCount)
       },
       {
        'display' : 'FOLLOWERS',
        'value' : numberFormatter(followersCount)
       },
       {
        'display' : 'LANGUAGE',
        'value' : lang
       }
    ]
    return(
        <div className='flex  flex-row detail-container'>
              {details?.map((item,id)=>(
                  <div key={id} className='flex-detail'>
                    <div className='detail-val'>{item?.value}</div>  
                    <div className='detail-item'>{item.display}</div> 
                  </div>
              ))}
        </div>
    )
}

export default Detail;