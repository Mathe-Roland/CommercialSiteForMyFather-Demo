import axios from 'axios';
import Cookies from 'js-cookie';

type dataForUsers = {
    price: number;
    optiuninormale: string;
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


export const userRelatedData = async (userId: string, imageId: string, data: dataForUsers) => {
    const token = Cookies.get("token");
    const description = Cookies.get("description");
    const title = Cookies.get("title");

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/panouritraforates?populate=*`;

    const headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`,
    };

    try {
        const response = await axios.post(
            url,
            {
                data: {
                    users_permissions_user: userId,
                    description: description,
                    image: imageId,
                    title: title,
                    price: data.price,
                    optiuniNormale: data.optiuninormale,
                    quantity: 1,
                },
            },
            { headers: headers }
        );
    } catch (error) {
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
  

