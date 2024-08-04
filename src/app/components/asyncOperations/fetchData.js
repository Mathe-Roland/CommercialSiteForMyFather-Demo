import axios from "axios";
import Cookies from 'js-cookie';



export const fetchPanouriData= async()=>{
    try{
        const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?populate=*`)

        return response.data.data;

    }catch(error){

    }

}


export const fetchArticlesData= async()=>{
  try{
      const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`)

      return response.data.data;

  }catch(error){

  }

}


export const fetchDataDespreNoiPage= async()=>{
  try{
      const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/despre-nois?populate=*`)

      return response;

  }catch(error){

  }

}



export const fetchPanouriCommentsPerPanouId= async(panouId)=>{
  try{
      const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/api::panouri-traforate.panouri-traforate:${panouId}`)

      return response;

  }catch(error){

  }

}

export const fetchPanouriArticlePerArticleId= async(panouId)=>{
  try{
      const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/api::article.article:${panouId}`)

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


export const fetchArticleId = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*&filters[id]=${id}`);
 
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const fetchId = async (title) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?populate=*&filters[title][$eq]=${title}`);
   
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  
  export const fetchCategory = async (category) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?populate=*&filters[category][$eq]=${category}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };


  export const registerUser = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
        identifier: username,
        password: password,
      });
  

  
      return response;
    } catch (err) {
  
    }
  };


  export const userRelatedData = async (userId,imageId,data) => {
    const token = Cookies.get("token");
  
    const description=Cookies.get("description");
    const title=Cookies.get("title");

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates?populate=*`;
  
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    
    axios
      .post(
        url,
        {
          data: {
            users_permissions_user: userId,
            description: description,
            image: imageId,
            title: title,
            price:data.price,
            optiuniNormale:data.optiuninormale,
            quantity:1,
          },
        },
        { headers: headers }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  };


  export const userRelatedComments = async (queryparam,panouId, message) => {
    const userId = Cookies.get("userId");
    const user = Cookies.get("user");

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/${queryparam}:${panouId}`;

    const headers = {
        "Content-type": "application/json; charset=UTF-8",
    };

    axios
        .post(
            url,
            {
                    "content": message,
                    "author": {
                        "id": userId,
                        "name": user,
                        "email": "jdoe@sample.com",
                        "avatar": null
                }
            },
            { headers: headers }
        )
        .then((response) => {
        })
        .catch((error) => {
        });
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



  export const userRelatedCommentsPluginUpdate = async (message,id,panouId) => {
    const token = Cookies.get("token");
    const userId=Cookies.get("userId");
    const user=Cookies.get("user");

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/api::panouri-traforate.panouri-traforate:${panouId}/comment/${id}`;
  
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    
    axios
    .put(
        url,
        {
          
            "content": message,
            "author": {
                "id": userId,
                "name": user,
                "email": "jdoe@sample.com",
                "avatar": null
        }
      },
        { headers: headers }
    )
    .then((response) => {
    })
    .catch((error) => {
    });

  };



  
export const userIds=async ()=>{


    const token = Cookies.get("token");
    const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": `Bearer ${token}`,
    };
    
    const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, { headers: headers });

    return response.data.id;
   
}

export const completeUserData=async ()=>{


  const token = Cookies.get("token");
  const headers = {
  "Content-type": "application/json; charset=UTF-8",
  "Authorization": `Bearer ${token}`,
  };
  
  const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, { headers: headers });

  return response.data;
 
}


  
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


export const userData = async () => {
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");
      const headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      };
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates?populate=*&filters[users_permissions_user][id][$eq]=${userId}`, { headers: headers });
      return response.data;
    } catch (error) {
      return null;
    }
  };



  export const updateProductData = async (productId,quantity,data) => {
    const token = Cookies.get("token");
  
  

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates/${productId}`;
  

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    
    axios
      .put(
        url,
        {
          data: {
            price:data.price,
            optiuniNormale:data.optiuninormale,
            quantity:quantity
          },
        },
        { headers: headers }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  };



  export const updateProductQuantity = async (productId,quantity) => {
    

    const token = Cookies.get("token");
  

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates/${productId}`;
  

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    
    axios
      .put(
        url,
        {
          data: {
            quantity:quantity
          },
        },
        { headers: headers }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  };


  export const deleteProductData = async (productId) => {
    const token = Cookies.get("token");
  
  

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates/${productId}`;
  

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    
    axios
      .delete(
        url,
        { headers: headers }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  };





  export const postareComenzi = async (userData) => {
    const token = Cookies.get("token");  
    const userId = Cookies.get("userId");

    const date=new Date();

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comenzis`;
  
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };

    
    axios
      .post(
        url,
        {
          data: {
            customerName: userId,
            name:userData.name,
            city:userData.city,
            surname:userData.surname,
            email:userData.email,
            postalcode:userData.postalcode,
            country:userData.country,
            total:userData.total,
            description: userData.description,
            payments:userData.payment,
            date:date,
            status:"pending",
          },
        },
        { headers: headers }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  };


  export const comenziPlasateUserData = async () => {
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");
      const headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      };
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comenzis?populate=*&filters[customerName][id][$eq]=${userId}`, { headers: headers });
      return response.data;
    } catch (error) {
      return null;
    }
  };


  // /api/contacts



  export const postareContact = async (userData) => {
    const token = Cookies.get("token");  

    const date=new Date();

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`;
  
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    
    axios
      .post(
        url,
        {
          data: {
            name:userData.name,
            inquiry:userData.message,
            email:userData.email,
            company:userData.company,
            phone:userData.phone,
            category:userData.category,
            date:date,

          },
        },
        { headers: headers }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  };

export const paymentSession=async ()=>{
  const metadataResponse = await userData();
  // Send amount and metadata to the server
  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({metadata: metadataResponse }),
  });
}


