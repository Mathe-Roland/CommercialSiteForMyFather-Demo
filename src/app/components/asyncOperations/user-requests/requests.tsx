import axios from 'axios';
import Cookies from 'js-cookie';

//endpoints related to users

export const registerUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
            identifier: username,
            password: password,
        });

        return response;
    } catch (err) {
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