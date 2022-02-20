import axios from "axios";
import { TWITTER } from "../api-base";
import transformSearch from "../transform";

const token = 'AAAAAAAAAAAAAAAAAAAAAISfZQEAAAAAubGaQz3VSOy6Xu8ctCdgZuPoxtA%3DuQdfsXG80hlNVuw33x6lVDpl8itp9Z8LSaw9ye9elxrsNYVOzQ'

export const getSearchResults = async (query, nextToken=null) => {
   try { 
     let url;
     url = nextToken ? `${TWITTER}/2/tweets/search/recent?query=${query}&max_results=10&tweet.fields=created_at,text,author_id,geo,lang,public_metrics&user.fields=created_at,name,username,profile_image_url,location,public_metrics&expansions=author_id&next_token=${nextToken}`:
     `${TWITTER}/2/tweets/search/recent?query=${query}&max_results=10&tweet.fields=created_at,text,author_id,geo,lang,public_metrics&user.fields=created_at,name,username,profile_image_url,location,public_metrics&expansions=author_id`
      const response = await axios.get(
      url,
      { headers: 
        { 
          "Authorization": `bearer ${token}`
        }
      });
  
    const transformedResponse = transformSearch(response) || response;
    return transformedResponse;
   }catch(e){
       console.log('error in search api',e)
   }
  };

 