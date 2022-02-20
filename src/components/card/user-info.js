const UserInfo = ({data}) =>{
    return(
        <div className='flex-row relative'>
        <img 
          src={data.user?.profile_image_url} 
          alt={data.user?.username?.[0]}
          width='40px'
          height='40px'
       />
       <div className='flex-column'>
        <div className='name mar-left-10'>{data.user?.name}</div>
        <div className='' onClick={()=>{
            window?.open(`https://twitter.com/intent/user?screen_name=${data.user?.username}`)
            }} className='color-blue mar-left-10'>{`@${data.user?.username}`}</div>
        </div>
        <div className='date'>{data?.date}</div>
     </div>
    )
}

export default UserInfo;