import axios from "axios";
import Cookies from 'js-cookie';


interface dataForUsers{
  UniqueIdentifier?:string,
  description?:string,
  image?:string,
  title?:string,
  price?:number,
  optiuninormale?:string,
  quantity?:number,
  vopsit?:boolean,
  date?: string,
  payment?: string,
  postalCode?:number,
  total?:number,
  email?:string,
  surname?:string,
  city?:string,
  country?:string,
  name?:string,
  message?:string,
  company?:string,
  phone?:string,
  category?:string,
  address?:string,
}

export const postNonRegisteredUserComanda = async (imageId :string, data:dataForUsers, quantity:number) => {
  const description = Cookies.get("description");
  const title = Cookies.get("title");

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforate-non-registered-users?populate=*`;

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };

  try {
    const response = await axios.post(
      url,
      {
        data: {
          UniqueIdentifier: data.UniqueIdentifier,
          description: description,
          image: imageId,
          title: title,
          price: data.price,
          optiuniNormale: data.optiuninormale,
          quantity: quantity,
          vopsit:data.vopsit
        },
      },
      { headers: headers }
    );
  } catch (error) {
    console.error("Error posting data:", error.message || error.response || error);
  }
};


export const updateNonRegisteredUserData = async (productId :string,quantity:number,data:dataForUsers) => {

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforate-non-registered-users/${productId}`;


  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };
  
  axios
    .put(
      url,
      {
        data: {
          price:data.price,
          optiuniNormale:data.optiuninormale,
          quantity:quantity,
          vopsit:data.vopsit
        },
      },
      { headers: headers }
    )
    .then((response) => {
    })
    .catch((error) => {
    });
};


export const plasareComandaNonRegisteredUser = async (data:dataForUsers) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comenzis?populate=*`, {
      date: data.date,
      payments: data.payment,
      postalcode:data.postalCode,
      total:data.total,
      email:data.email,
      surname:data.surname,
      city:data.city,
      name:data.name,
      title:data.title,
    });
  
  } catch (err) {

  }
};


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



export const fetchPanouriCommentsPerPanouId= async(panouId:string)=>{
  try{
      const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/api::panouri-traforate.panouri-traforate:${panouId}`)

      return response;

  }catch(error){

  }

}

export const fetchPanouriArticlePerArticleId= async(panouId:string)=>{
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

type fetchArticleIdParameter=string|Array<string>

export const fetchArticleId = async (id:fetchArticleIdParameter) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*&filters[id]=${id}`);
 
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const fetchId = async (title:string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?populate=*&filters[title][$eq]=${title}`);
   
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  
  export const fetchCategory = async (category:string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?populate=*&filters[category][$eq]=${category}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };


  export const registerUser = async (username:string, password:string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
        identifier: username,
        password: password,
      });
    
      return response;
    } catch (err) {
  
    }
  };


  export const userRelatedData = async (userId:string,imageId:string,data:dataForUsers) => {
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


  export const userRelatedComments = async (queryparam:string,panouId:fetchArticleIdParameter, message:string) => {
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



export const changePasswordAuthUser = async (currentPassword:string,newPassword:string) => {
  
  const token = Cookies.get("token");

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/change-password`;

    try {
      const response = await axios.post(url,
        {
          currentPassword: currentPassword,
          password: newPassword,
          passwordConfirmation: newPassword,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
    
      return response;
    } catch (err) {
  
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



  export const userRelatedCommentsPluginUpdate = async (message:string,id:string,panouId:string) => {
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

  
  export const imageNonREgisteredUser=async ()=>{


    const headers = {
    "Content-type": "application/json; charset=UTF-8",
    };
    
    const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files`, { headers: headers });

    return response.data;
   
}


  export const imageFiles=async ()=>{


    const token = Cookies.get("token");
    const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": `Bearer ${token}`,
    };
    
    const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files`, { headers: headers });

    return response.data;
   
}


export const nonRegisteredUserData = async () => {
  try {
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforate-non-registered-users?populate=*`, { headers: headers });
    return response.data;
  } catch (error) {
    return null;
  }
};


export const promotii = async () => {
  try {
    
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };

    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/promotiis?populate=*`, { headers: headers });

    return response.data;

  } catch (error) {
    return null;
  }
};


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

  
  export const updateProductDataOriginalSetting = async (productId:string,quantity:number,data:dataForUsers) => {
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
  
export const updateProductDataNonRegisteredUserOriginalSetting = async (productId :string,quantity:number,data:dataForUsers) => {

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforate-non-registered-users/${productId}`;


    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };
  
    axios
      .put(
       url,
        {
          data: {
            price:data.price,
            quantity:quantity,
        },
      },
      { headers: headers }
    )
    .then((response) => {
    })
    .catch((error) => {
    });
};


  export const updateProductData = async (productId:string,quantity:number,data:dataForUsers) => {
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



  export const updateProductQuantity = async (productId:string,quantity:number) => {
    

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


  export const updateProductQuantityForNonRegisteredUser = async (productId:string,quantity:number) => {
  
    
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforate-non-registered-users${productId}`;
  

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
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


  export const deleteProductData = async (productId:string) => {
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
  
  export const deleteProductDataFNonRegisteredUser = async (productId:string) => {
  
  
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforate-non-registered-users/${productId}`;
  

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
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


  export const deleteNonRegisteredUserProduct = async (productId:string) => {
    

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforate-non-registered-users/${productId}`;
  

    const headers = {
      "Content-type": "application/json; charset=UTF-8",
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






  export const postareComenzi = async (userData:dataForUsers) => {
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
            postalcode:userData.postalCode,
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

  export const postareComenziNonRegisteredUser = async (userData:dataForUsers) => {

    const date=new Date();

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comenzis`;
  
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };

    
    axios
      .post(
        url,
        {
          data: {
            name:userData.name,
            city:userData.city,
            surname:userData.surname,
            email:userData.email,
            postalcode:userData.postalCode,
            country:userData.country,
            total:userData.total,
            description: userData.description,
            payments:userData.payment,
            address:userData.address,
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





  export const postareContact = async (userData:dataForUsers) => {
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
  
  export const postareContactNonRegisteredUser = async (userData:dataForUsers) => {
    
    const date=new Date();
    
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`;
    
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
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