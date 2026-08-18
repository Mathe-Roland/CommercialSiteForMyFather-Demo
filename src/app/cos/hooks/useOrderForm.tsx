"use client";

import { useState, useEffect } from "react";

import { userMeFIelds } from "../../components/asyncOperations/user-requests/requests";

export function useOrderForm() {
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    country: "",
    postalCode: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchFormDataForAuthenticatedUser = async () => {
      try {
        const authenticatedUserData = await userMeFIelds();


        if (!authenticatedUserData) {
          return;
        }

        if (authenticatedUserData.provider === "google") {
              setFormData({
                email: authenticatedUserData.email || "",
                name: authenticatedUserData.name || "",
                surname: "",
                country: "",
                postalCode: "",
                city: "",
                address: "",
                phoneNumber: "",
              });

            } else {

              setFormData({
                email: authenticatedUserData.email || "",
                name: authenticatedUserData.name || "",
                surname: authenticatedUserData.surname || "",
                country: authenticatedUserData.country || "",
                postalCode: authenticatedUserData.postalcode || "",
                city: authenticatedUserData.city || "",
                address: authenticatedUserData.address || "",
                phoneNumber: authenticatedUserData.phoneNumber || "",
              });

            }

      } catch (error) {
        console.error(
          "Failed to fetch authenticated user data:",
          error
        );
      }
    };

    fetchFormDataForAuthenticatedUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  return {
    openModal,
    setOpenModal,
    formData,
    handleChange,
    handleSubmit,
  };
}