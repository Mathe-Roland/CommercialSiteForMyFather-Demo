"use client";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const description = order?.attributes?.description;

    // 🔒 Safety check
    if (!description || typeof description !== "string") {
      setOrderItems([]);
      return;
    }

    const lines = description
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const items = [];
    let currentItem = null;

    for (let line of lines) {
      // 🟢 New product (starts with "1.", "2.", etc.)
      if (/^\d+\./.test(line)) {
        if (currentItem) items.push(currentItem);

        currentItem = {
          title: line.replace(/^\d+\.\s*/, "").trim(),
          quantity: null,
          price: null,
          size: null,
        };
      }

      // 🔵 Quantity
      else if (line.toLowerCase().includes("cantitate")) {
        const match = line.match(/\d+/);
        if (match && currentItem) {
          currentItem.quantity = match[0];
        }
      }

      // 🟣 Size / options
      else if (line.toLowerCase().includes("optiuni")) {
        if (currentItem) {
          currentItem.size = line.split(":")[1]?.trim() || null;
          const index = line.indexOf(":");
          if (index !== -1 && currentItem) {
            currentItem.size = line.slice(index + 1).trim();
          }
        }
      }

      // 🟠 Price (unit price only)
      else if (line.toLowerCase().includes("pret unitar")) {
        const match = line.match(/\d+/);
        if (match && currentItem) {
          currentItem.price = match[0];
        }
      }
    }

    // push last item
    if (currentItem) items.push(currentItem);

    setOrderItems(items);
  }, [order?.attributes?.description]);

  return (
    <Card className="orderCard">
      <CardContent>
        <Typography variant="h5" component="h2">
          Order Details
        </Typography>

        {/* ❗ IMPORTANT FIX: avoid <ul> inside <p> */}
        <div>
          <p>Order Number: {order?.id}</p>

          <p>Order Items:</p>
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>
                {item.title} - {item.quantity ?? "-"} buc -{" "}
                {item.price ?? "-"} lei - {item.size ?? "-"}
              </li>
            ))}
          </ul>

          <p>Total Cost: {order?.attributes?.total} lei</p>
          <p>Order Status: {order?.attributes?.status}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;