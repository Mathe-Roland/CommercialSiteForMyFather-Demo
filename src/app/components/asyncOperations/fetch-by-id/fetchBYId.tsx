import axios from 'axios';
import Cookies from 'js-cookie';

//fetch requests by id

export const fetchPanouriCommentsPerPanouId = async (panouId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/api::panouri-traforate.panouri-traforate:${panouId}`);
        return response;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const fetchPanouriArticlePerArticleId = async (panouId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/api::article.article:${panouId}`);
        return response;
    } catch (error) {
        console.error('Error fetching article:', error);
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


  type fetchArticleIdParameter=string|Array<string>


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


type dataForUsers = {
    price: number;
    optiuninormale: string;
};

export const updateProductData = async (productId: string, quantity: number, data: dataForUsers) => {
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
                    price: data.price,
                    optiuniNormale: data.optiuninormale,
                    quantity: quantity,
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


    
export const fetchId = async (title:string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouri-traforates?populate=*&filters[title][$eq]=${title}`);
   
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  