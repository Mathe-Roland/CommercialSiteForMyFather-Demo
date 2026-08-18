import axios from 'axios';
import Cookies from 'js-cookie';


export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
            {
                identifier: username,
                password: password,
            },
            {
                headers: {
                    "X-Site": "decorcut",
                },
            }
        );


        return response;
    } catch (err) {
        console.error("Login failed:", err);
        throw err;
    }
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
  
  export const userMe=async ()=>{


        const token = Cookies.get("token");
        const headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`,
        };
        
        const response=await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, { headers: headers });
    
        return response.data.id;
       
    };


export const userMeFIelds = async () => {
    const token = Cookies.get("token");


    if (!token) {
        return null;
    }

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return response.data;
    } catch (error) {
        console.error("USER ME ERROR:", error);
        throw error;
    }
};