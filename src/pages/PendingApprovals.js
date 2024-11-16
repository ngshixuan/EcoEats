import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { db, storage } from "../firebase/firebase-config";
import { collection, doc, getDocs, query, updateDoc, where, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";


const PendingApprovals = () => {

    const [pendingapprovals, setPendingApprovals] = useState([]);
    const [loading, setLoading] = useState(null);
    const [rejectButton, setRejectButton] = useState(null);

    useEffect(() => {
        fetchPendingApprovals();
    }, [])

    const fetchPendingApprovals = async () => {
        try{
            const productsCollection = collection(db, "products");
            const q = query(productsCollection, where("approved", "==", false));
            const querySnapshot = await getDocs(q);
            // const products = [];
            // querySnapshot.forEach(async (doc) => {
            //     const data = doc.data();
            //     const imageURL = await getFirstImageURL(doc.id);

            //     const dataObj = {
            //       id: doc.id,
            //       ...data,
            //       imageURL
            //     }

            //     products.push(dataObj);
            // });

            const products = await Promise.all(
              querySnapshot.docs.map(async (doc) => {
                const data = doc.data();
                const imageURL = await getFirstImageURL(doc.id);

                return{
                  id: doc.id,
                  ...data,
                  imageURL,
                };
              })
            )
            setPendingApprovals(products);
            console.log(pendingapprovals);
            
        }
        catch(err){
            console.log(err);
            
        }
    }

    const getFirstImageURL = async (productId) => {
      const storageReference = ref(
        storage,
        `products/${productId}/products.jpg`
      );
      console.log("Product ID:", productId);
      console.log("Storage Reference:", storageReference);
  
      try {
        const imageURL = await getDownloadURL(storageReference);
        console.log("Image URL:", imageURL);
        return imageURL;
  
      } catch (error) {
        console.error("Error fetching image URL:", error);
        return null; 
      }
    };

    const handleApprove = async (productId) => {
      setLoading(productId);
      try {
        // Update the 'approved' field to true
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, {
          approved: true,
        });
  
        // Optionally, you can fetch the updated pending approvals after approval
        fetchPendingApprovals();
        
        setLoading(null);
      } catch (error) {
        console.error("Error approving product:", error);
        // Handle the error as needed
        setLoading(productId);
      }
    };

    const handleReject = async (productId) => {
      setRejectButton(productId);
      try {
        // Delete the document from Firestore
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
  
        // Optionally, you can fetch the updated pending approvals after rejection
        fetchPendingApprovals();

        setRejectButton(productId);
      } catch (error) {
        console.error("Error rejecting product:", error);
        // Handle the error as needed
        setRejectButton(productId);
      }
    };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      render: (text, record) => (
        <div className=" text-center">
          <div className="flex gap-2 items-center space-x-3">
            <div>
              <div className="font-bold text-slate-700">{text}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Item Price (RM)",
      dataIndex: "itemPrice",
      key: "itemPrice"
    },
    {
      title: "Item Description",
      dataIndex: "itemDescription",
      key: "itemDescription",
    },
    {
      title: "Approve or Not",
      dataIndex: "action",
      key: "action",
    },
  ];

  const data = pendingapprovals.map((approval, index) => ({
    key: approval.id,
    index: index + 1,
    user: (
        <div className="flex flex-col">
          <div><b>Username: </b>{approval.username}</div>
          <div><b>User ID: </b>{approval.uid}</div>
        </div>
      ),
    itemName: (
      <div className=" text-center">
        <div className="flex gap-2 items-center space-x-3">
          <div className="rounded w-16 h-12">
            <img src={approval.imageURL} alt={approval.title} />
          </div>
          <div>
            <div className="font-bold text-slate-700">{approval.title}</div>
          </div>
        </div>
      </div>
    ),
    itemPrice:(
      <div>RM {approval.price}</div>
    ),
    itemDescription: approval.description,
    action: (
        <div>
        <Button
          className="border-solid border-2 border-green-500 bg-green-500 hover:bg-green-600 text-white p-1 rounded-md mr-2"
          style={{ outline: "none" }}
          onClick={() => handleApprove(approval.id)}
          loading={loading === approval.id}
        >
          Approve
        </Button>
        <Button
          className="border-solid border-2 border-red-500 bg-red-500 hover:bg-red-600 text-white p-1 rounded-md"
          onClick={() => handleReject(approval.id)}
          loading={rejectButton === approval.id}
        >
          Reject
        </Button>
      </div>
    ),
  }));


  return (
    <div style={{ backgroundColor: "rgb(196,243,199)" }} className="p-12">
      <h1 className="vanBold text-5xl text-center mb-8">Pending Approvals</h1>
      <Table columns={columns} bordered dataSource={data}/>

    </div>
  );
};

export default PendingApprovals;