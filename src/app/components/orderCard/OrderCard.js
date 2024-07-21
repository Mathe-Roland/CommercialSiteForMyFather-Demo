import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect,useState } from 'react';
import "./OrderCard.css";

const OrderCard = ({ order }) => {

    const [orderitem,setOrderItems]=useState([]);

    useEffect(() => {
        const items = order.attributes.description.split('\n').map(line => {
            if(line===""){

                return null;
            }
            const data = line.split("at price");
            const title = data[0];
            const numbers = line.match(/\d+/g);
            const price = numbers[0];
            const quantity = numbers[1];
            const size=data[1]?.split("at size");
            const newSize=size[size.length-1];

            return { title, price, quantity ,newSize}; // Include price and quantity in the returned object
        }).filter(filterNull=>filterNull!==null);

        setOrderItems(items);
    }, [order.attributes.description]); // Include order.attributes.description in the dependency array to re-run effect when it changes


  return (
    <Card className='orderCard'>
      <CardContent>
        <Typography variant="h5" component="h2">
          Order Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Order Number: {order.id}<br />
          Order Items: 
          <ul>
            {orderitem.map((item, index) => (
              <li key={index}>{item.title} -  {item.quantity} buc - {item.price} lei - {item.newSize}</li>
            ))}
          </ul>
          Total Cost:  {order.attributes.total} lei<br />
          Order Status: {order.attributes.status}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
