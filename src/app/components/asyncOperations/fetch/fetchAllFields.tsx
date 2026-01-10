import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchPanouriData = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?populate=*`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Panouri data:', error);
    }
};

export const fetchArticlesData = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Articles data:', error);
    }
};



export const fetchCategoryDescriptions = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?populate=*`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Articles data:', error);
    }
};




export const fetchDataDespreNoiPage= async()=>{
    try{
        const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/despre-nois?populate=*`)
  
        return response;
  
    }catch(error){
  
    }
  
  }
  
  
export const fetchArticle = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles`);
   
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };


  
  export const userRelatedCommentsGet = async () => {
    const token = Cookies.get("token");
    const userId=Cookies.get("userId");

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`;
  
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    
    const data=await axios.get(url);

    return data.data;

  };

   
  export const getUserRelatedData = () => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates`;
  
    const token = Cookies.get("token");
    
  
    axios.get(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
  })
  .then(response => {
  })
  .catch(error => {
  });
};






export const imageFiles=async ()=>{


    const token = Cookies.get("token");
    const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": `Bearer ${token}`,
    };
    
    const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files`, { headers: headers });

    return response.data;
   
}

