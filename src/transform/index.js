const transformSearch = (resp) =>{
try{  
  const {data={}} = resp;
  console.log(resp)
  if(data?.meta?.result_count === 0){
    return resp.data.data = [];
  }
  data?.data?.forEach((item)=>{
    const date = new Date(item?.created_at);
    item.date = date?.toISOString()?.substring(0, 10);
    let user = {}
    user = data?.includes?.users?.filter((data)=>{
            return ( data?.id === item?.author_id)
      });
    item.user = user?.[0];  
  })

  return resp;
}catch(e){

}
}

export default transformSearch;