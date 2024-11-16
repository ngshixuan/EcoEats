import React, { useContext, useState } from "react";
import { Row, Col, Input, Button, Upload, Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Checkbox, message } from "antd";
import {db, storage} from "../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {AuthContext} from "../context/Auth";

const { TextArea } = Input;
const { Dragger } = Upload;


const Sell = () => {

  const {user} = useContext(AuthContext);

 const [form] = Form.useForm();
 const [confirmLoading, setConfirmLoading] = useState(false);

console.log(db);

const handleImageUpload = async ({ file, onSuccess, onError }) => {
    try {
      // Simulate successful upload for demo purposes
      // You should replace this with your actual upload logic
      setTimeout(() => {
        onSuccess();
        message.success(`${file.name} file uploaded successfully`);
      }, 1000);
    } catch (error) {
      console.error("Error uploading product image:", error);
      onError(error);
      message.error("Failed to upload product image");
    }
  };

  const handleSubmit = async() =>{
    try{

        //validate the form fields
        const values = await form.validateFields();
        console.log(values);

        const formData = {
            title: values.title,
            price: parseFloat(values.price).toFixed(2),
            description: values.description,
            expiry: values.expiry,
            pickupLocation: values.pickupLocation,
            approved: false,
            username: user.displayName,
            uid: user.uid
        }
        console.log(formData);
        
        form.resetFields();

        const collectionRef = collection(db, "products");
        const docRef = await addDoc(collectionRef, formData);

        const docID = docRef.id;
        const productImage = values.image[0];

        console.log(productImage);
        
        try {
          await uploadProductImage(docID, productImage);
        } catch (error) {
          console.error("Error uploading product image: ", error);
          
          message.error("Failed to upload product image");
        }

        message.success("Ad submmited for admin review successfully");
      
    }
    catch(err){
        console.log(err);
    }

    
  }

  const uploadProductImage = async (productID, productImage) =>{
    const storageRef = ref(storage, `products/${productID}/products.jpg`);

    const metadata = {
      contentType: "image/jpeg",
    };

    try{
      if(productImage.originFileObj){
        const imageFile = productImage.originFileObj;
        await uploadBytes(storageRef, imageFile, metadata);
      }
      else{
        console.error("Error: originFileObj is empty");
      }
    }
    catch(error){
      console.error("Error uploading product image: ", error);
    }
  }
 
 return (
   <div
     style={{ backgroundColor: "rgb(196,243,199)" }}
     className="p-12 text-center flex flex-col items-center"
   >
     <h1 className="vanBold text-7xl">Sell a Product</h1>
     <div className="mt-8 w-3/5">
       <Form form={form} onFinish={handleSubmit}>
         <div className="bg-white p-8 rounded-lg">
           <h2 className="vanBold text-3xl mb-6">Ad Information</h2>
           <Row gutter={[16, 16]}>
             <Col span={12}>
               <div>
                 <Form.Item
                   label={<span className="vanBold text-xl">Ad Title</span>}
                   labelCol={{ span: 24 }}
                   name="title"
                   rules={[
                     { required: true, message: "Please enter the ad title" },
                     {
                       max: 10,
                       message: "Title must not exceed 10 characters",
                     },
                   ]}
                 >
                   <Input className="w-full rounded border border-gray-300 p-2" />
                 </Form.Item>
               </div>
             </Col>
             <Col span={12}>
               <div>
                 <Form.Item
                   label={
                     <span className="vanBold text-xl">Selling Price</span>
                   }
                   labelCol={{ span: 24 }}
                   name="price"
                   rules={[
                     {
                       required: true,
                       message: "Please enter the selling price",
                     },
                     {
                       validator: (_, value) => {
                         const numericValue = parseFloat(value);
                         if (isNaN(numericValue)) {
                           return Promise.reject(
                             "Please enter a valid number"
                           );
                         }
                         if (numericValue < 0 || numericValue > 1000) {
                           return Promise.reject(
                             "Price must be between 0 and 1000"
                           );
                         }
                         return Promise.resolve();
                       },
                     },
                   ]}
                 >
                   <Input
                     type="number"
                     className="w-full rounded border border-gray-300 p-2"
                   />
                 </Form.Item>
               </div>
             </Col>
           </Row>
           <Row gutter={[16, 16]}>
             <Col span={12}>
               <div>
                 <Form.Item
                   label={
                     <span className="vanBold text-xl">
                       Ad Pickup Location
                     </span>
                   }
                   labelCol={{ span: 24 }}
                   name="pickupLocation"
                   rules={[
                     {
                       required: true,
                       message: "Please enter the pickup location",
                     },
                     {
                       max: 30,
                       message:
                         "Pickup location must not exceed 30 characters",
                     },
                   ]}
                 >
                   <Input className="w-full rounded border border-gray-300 p-2" />
                 </Form.Item>
               </div>
             </Col>
             <Col span={12}>
               <div>
                 <Form.Item
                   label={
                     <span className="vanBold text-xl">Ad Expiry Date</span>
                   }
                   labelCol={{ span: 24 }}
                   name="expiry"
                   rules={[
                     {
                       required: true,
                       message: "Please enter the food expiry date",
                     },
                   ]}
                 >
                   <Input
                     type="date"
                     className="w-full rounded border border-gray-300 p-2"
                   />
                 </Form.Item>
               </div>
             </Col>
           </Row>
           <Row gutter={[16, 16]}>
             <Col span={12}>
               <div>
                 <Form.Item
                   label={
                     <span className="vanBold text-xl">Ad Description</span>
                   }
                   labelCol={{ span: 24 }}
                   name="description"
                   rules={[
                     {
                       required: true,
                       message: "Please enter the ad description",
                     },
                     {
                       max: 100,
                       message: "Description must not exceed 100 characters",
                     },
                   ]}
                 >
                   <TextArea
                     rows={4}
                     className="w-full rounded border border-gray-300 p-2"
                   />
                 </Form.Item>
               </div>
             </Col>
             <Col span={12}>
               <div>
                 <Form.Item
                   label={
                     <span className="vanBold text-xl">Image Upload</span>
                   }
                   labelCol={{ span: 24 }}
                   name="image"
                   rules={[
                     { required: true, message: "Please upload an image" },
                   ]}
                 >
                   <Dragger
                     className="w-full h-full"
                   //   customRequest={handleImageUpload}
                     accept="image/*"
                     maxCount={1}
                     fileList={form.getFieldValue("image")}
                     onChange={(info) =>
                       form.setFieldsValue({ image: info.fileList })
                     }
                   >
                     <p className="ant-upload-drag-icon">
                       <InboxOutlined />
                     </p>
                     <p className="ant-upload-text">
                       Click or drag image file to this area to upload
                     </p>
                   </Dragger>
                 </Form.Item>
               </div>
             </Col>
           </Row>
           <Row gutter={[16, 16]}>
             <Col span={24}>
               <div>
                 <Form.Item
                   name="acknowledge"
                   valuePropName="checked"
                   rules={[
                     {
                       required: true,
                       message: "Please acknowledge responsibility",
                     },
                   ]}
                 >
                   <Checkbox className="vanRegular text-lg">
                     I acknowledge that I am responsible for the information
                     provided.
                   </Checkbox>
                 </Form.Item>
               </div>
             </Col>
           </Row>
           <div className="mt-4">
             <Button
               htmlType="submit"
               className="vanBold text-xl bruh"
               loading={confirmLoading}
             >
               Publish Ad
             </Button>
           </div>
         </div>
       </Form>
     </div>
   </div>
 );
};


export default Sell;