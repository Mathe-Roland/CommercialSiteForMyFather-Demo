import axios from 'axios';
import Cookies from 'js-cookie';

type dataForUsers = {
    name?: string;
    message: string;
    email: string;
    company: string;
    phone: number;
    category: string;
};

export const postareContactNonRegisteredUser = async (userData: dataForUsers) => {
    const date = new Date();

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`;

    const headers = {
        "Content-type": "application/json; charset=UTF-8",
    };

    try {
        const response = await axios.post(
            url,
            {
                data: {
                    name:userData.name,
                    inquiry: userData.message,
                    email: userData.email,
                    company: userData.company,
                    phone: userData.phone,
                    category: userData.category,
                    date: date,
                },
            },
            { headers: headers }
        );
    } catch (error) {
    }
};

export const postareContact = async (userData: dataForUsers) => {
    const token = Cookies.get("token");
    const date = new Date();

    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`;

    const headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`,
    };

    try {
        const response = await axios.post(
            url,
            {
                data: {
                    name: userData.name,
                    inquiry: userData.message,
                    email: userData.email,
                    company: userData.company,
                    phone: userData.phone,
                    category: userData.category,
                    date: date,
                },
            },
            { headers: headers }
        );
    } catch (error) {
    }
};