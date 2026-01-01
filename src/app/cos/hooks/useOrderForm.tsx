import { useState } from "react";

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

  const handleChange = (e) => {
    setFormData(prev => ({
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
