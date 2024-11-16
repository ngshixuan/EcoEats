import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import no_products from "../assets/images/empty.png";
import { db, storage} from "../firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../components/utilities/LoadingSpinner";
import Card from "../components/Card";
import { getDownloadURL, ref } from "firebase/storage";
import {CartContext} from "../context/CartContext";

const Shop = ({forTopPicks}) => {
  const {addToCart} = useContext(CartContext);
  
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const handleClick = (item) => {
    console.log(item);
    addToCart(item);
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("approved", "==", true));
        const productsSnapshot = await getDocs(q);
  
        const productsData = [];
        // console.log(productsSnapshot.docs) // array of 4 docs
  
        for (const docRef of productsSnapshot.docs) {
          // console.log(docRef.data())
  
          const product = docRef.data()
  
          // if product.approved == true --> push to productsData
          const imageURL = await getFirstImageURL(docRef.id);
          productsData.push({...product, id: docRef.id, imageURL});
        }
  
        // console.log(productsData);
        setAllProducts(productsData)
      } catch (error) {
        console.log(error);
      } 
      finally{
        setLoading(false);
      }
     
    };

    fetchAllProducts();
  }, []);


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


  return (
    <div style={{ backgroundColor: "rgb(196,243,199)" }} className="p-12  ">

      {!forTopPicks && 
        <div className="flex gap-2 ">
          <h1 className="vanBold text-5xl ml-4">All Products</h1>
          <Link to="/sell">
            <IoIosAddCircle size={48} className="text-green-500" />
          </Link>
        </div>
      }
      
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
        
      ) : (
        <div className="flex flex-wrap mt-8">
          {
            allProducts.map((item)=>(
              <Card key={item.id} item={item} handleClick={handleClick}/>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default Shop;