import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { CartContext, useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/utilities/LoadingSpinner";
import { Row, Col, Input, Button, Upload, Form, message, Select } from "antd";
import { db } from "../firebase/firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

const Checkout = () => {
    const navigate = useNavigate();

    const {cart, removeFromCart, clearCart} = useContext(CartContext);


    useEffect(() => {
        setCartData(cart);
    })

  const [cartData, setCartData] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
 
  const [form] = Form.useForm();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);

    setCartData((prevCartData) => 
        prevCartData.filter((item) => item.id !== productId)
    )
  }

  const calculateTotalData = () =>{
    return cartData.reduce((total, item) => total + parseFloat(item.price), 0)
  }

  const formatCreditCardNumber = (value) => {
    if (!value) return value;

    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = numericValue.replace(/(\d{4})/g, "$1 ").trim();
    return formattedNumber;
  };

  const handlePurchase = async() => {
    setIsPurchasing(true);
    try {
        //loop through the cart items and delete corresponding docs

        for(const item of cartData){
            const itemDocRef = doc(db, "products", item.id);

            await deleteDoc(itemDocRef);

            clearCart();

            notification.success({
                message: "Purchase Successful",
                description: "Thank you for your purchase!"
            });

            navigate("/");
            setIsPurchasing(false); 
        }
    } catch (error) {
        setIsPurchasing(false);
        notification.error({
            message: "Error",
            description: "An error occurred during the purchase"
        });
        console.log(error);
        
    }
  }

  return (
    <div style={{ backgroundColor: "rgb(196,243,199)" }} className="p-12">
      <h1 className="vanBold text-5xl">Checkout</h1>
      <div className="flex">

        <div className="w-3/5 bg-slate-100 p-8 m-4 rounded-lg">
          <h1 className="vanBold text-lg mb-4">Your Order</h1>
          <table className="w-full border-collapse border border-gray-300 mb-4 bg-white">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border text-center">No</th>
                <th className="py-2 px-4 border text-center">Title</th>
                <th className="py-2 px-4 border text-center">Description</th>
                <th className="py-2 px-4 border text-center">Expiry</th>
                <th className="py-2 px-4 border text-center">Price</th>
                <th className="py-2 px-4 border text-center">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {cartData.length > 0 ? (
                cartData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="flex gap-2 items-center space-x-3">
                        <div className="rounded w-16 h-12">
                          <img
                            src={item.imageURL}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-700">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border text-center text-slate-700">
                      {item.description}
                    </td>
                    <td className="py-2 px-4 border text-center text-slate-700">
                      {item.expiry}
                    </td>
                    <td className="py-2 px-4 border text-center font-bold">
                      RM {parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="flex justify-center">
                        <div
                          className="rounded text-white cursor-pointer bg-red-500 p-2"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <FaRegTrashAlt />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <h2 className="text-center font-bold my-12">
                      No Product Found
                    </h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex flex-col justify-start text-2xl gap-4">
            <div className="font-bold">
              Total: RM {calculateTotalData().toFixed(2)}
            </div>

            <div className="bg-white rounded-lg border-solid border-slate-700 border-1 p-4">
              <h1 className="vanBold text-xl border-b border-gray-300 pb-1 mb-2">
                Credit Card / Debit Card (Stripe)
              </h1>
              <Form
                form={form}
                initialValues={{ creditCardNumber: "" }}
                onValuesChange={(changedValues, allValues) => {
                  form.setFieldsValue({
                    creditCardNumber: formatCreditCardNumber(
                      allValues.creditCardNumber
                    ),
                  });
                }}
            
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <Form.Item
                        label={
                          <span className="vanBold text-lg">
                            Credit Card Number
                          </span>
                        }
                        labelCol={{ span: 24 }}
                        name="creditCardNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your credit card number",
                          },
                          {
                            pattern: /^[0-9 ]*$/,
                            message: "Please enter a valid credit card number",
                          },
                          {
                            validator: (_, value) => {
                              const numericValue = value
                                ? value.replace(/\D/g, "")
                                : "";
                              if (numericValue.length > 16) {
                                return Promise.reject(
                                  "Credit card number must not exceed 16 digits"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input className="w-full rounded border border-gray-300 p-1" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div>
                      <Form.Item
                        label={
                          <span className="vanBold text-lg">Expiry Date</span>
                        }
                        labelCol={{ span: 24 }}
                        name="expiryDate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the expiry date",
                          },
                          {
                            pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: "Please enter a valid expiry date (MM/YY)",
                          },
                        ]}
                      >
                        <Input
                          className="w-full rounded border border-gray-300 p-1"
                          placeholder="MM/YY"
                         
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Form.Item
                        label={
                          <span className="vanBold text-lg">
                            Card Code (CVC)
                          </span>
                        }
                        labelCol={{ span: 24 }}
                        name="cardCode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the Card Code (CVC)",
                          },
                          {
                            pattern: /^[0-9]{3}$/,
                            message:
                              "Please enter a valid 3-digit Card Code (CVC)",
                          },
                        ]}
                      >
                        <Input
                          className="w-full rounded border border-gray-300 p-1"
                          maxLength={3}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>

            <button
              className="border-solid border-4 p-1 inline-block border-black text-md vanRegular self-start"
              onClick={handlePurchase}
              disabled={isPurchasing}
              loading={isPurchasing}
            >
                {isPurchasing? "Purchasing...":"Purchase Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );


};

export default Checkout;