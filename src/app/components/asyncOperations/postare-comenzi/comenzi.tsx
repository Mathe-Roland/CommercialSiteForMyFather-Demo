import axios from 'axios';
import Cookies from 'js-cookie'


interface DataForUsers {
    date: Date;
    payment: string;
    postalCode: string;
    total: number;
    email: string;
    phoneNumber:string;
    surname: string;
    city: string;
    name: string;
    country?: string;
    description?: string;
    address?: string;
}

export const postareComenziNonRegisteredUser = async (userData: DataForUsers) => {


    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comenzis`;
  
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };

    axios
      .post(
        url,
        {
          data: {
            name: userData.name,
            city: userData.city,
            surname: userData.surname,
            email: userData.email,
            postalcode: userData.postalCode,
            country: userData.country,
            total: userData.total,
            description: userData.description,
            payments: userData.payment,
            phone: userData.phoneNumber,
            address: userData.address,
            date: userData.date,
            status: "pending",
          },
        },
        { headers: headers }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
};

export const postareComenzi = async (userData: DataForUsers) => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");


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
                    name: userData.name,
                    city: userData.city,
                    surname: userData.surname,
                    email: userData.email,
                    postalcode: userData.postalCode,
                    country: userData.country,
                    total: userData.total,
                    description: userData.description,
                    payments: userData.payment,
                    phone: userData.phoneNumber,
                    date: userData.date,
                    status: "pending",
                },
            },
            { headers: headers }
        )
        .then((response) => {})
        .catch((error) => {});
};
