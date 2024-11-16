import React, { Fragment, useEffect, useState, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import {  Drawer, message } from "antd";
import empty from "../../assets/images/empty.png";
import { FaUserAlt } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { CartContext } from "../../context/CartContext";
import CartItem from "../CartItem";


export default function Header() {
 const navigate = useNavigate();
 const [open, setOpen] = useState(false);
 const [placement, setPlacement] = useState("left");
 const [username, setUsername] = useState("");

 const {cart, clearCart} = useContext(CartContext);
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUsername(user.displayName);
      }
      
    })
  },[])

  const handleClear = () => {
    clearCart();
  }

  const handleCheckOut = () => {
    if(cart.length === 0){
      message.error("Cart is empty");
    }
    else{
      setOpen(false);
      navigate("/checkout");
    }
  }

 const showDrawer = () => {
   setOpen(true);
 };

 const onClose = () => {
   setOpen(false);
 };

 const handleSignOut = async () => {
  try {
    await signOut(auth);

    navigate("/login");
  } catch (error) {
    console.log(error);
    message.error(error);
  }
  
 }

 return (
   <div className="vanBold bg-white h-28 px-16 flex items-center border-b border-gray-300  justify-between">
     <div className="flex items-center gap-4 ">
       <div>
         {" "}
         <Link to="/">
           {" "}
           <img src={logo} className="w-24 " alt="" />
         </Link>
       </div>
       <div className="text-white bg-gray-900 p-2 text-3xl">MyEcoEats.com</div>
     </div>
     <div className="flex items-center gap-16  text-2xl">
       <div>
         <Link to="/">Home</Link>
       </div>
       <div>
         <Link to="/shop">Shop</Link>
       </div>
       <div>
         <Link to="/about">About</Link>
       </div>
       <div>
         <Link to="/contact">Contact</Link>
       </div>
     </div>
     <div className="flex items-center gap-6 mr-2">
       <div>
         <Link
           to="/sell"
           type="primary"
           className="bg-green-500 text-white py-2 px-4 rounded-lg"
         >
           Sell
         </Link>
       </div>
         <div className="hover:cursor-pointer">
           <div className="relative">
             <TiShoppingCart size={36} onClick={showDrawer} />
             <Drawer
               title={<p className="vanBold text-2xl">Cart</p>}
               placement={placement}
               closable={false}
               onClose={onClose}
               open={open}
               key={placement}
             >
               <div className="h-4/5">
                 <div className="h-4/5">
                 {
                  cart.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-full">
                       <img src={empty} alt="" className="w-3/5" />
                       <p>Your cart is empty.</p>
                     </div>
                  ):(
                    cart.map((item) => (
                      <CartItem key={item.id} item={item}/>
                    ))
                  )
                 }
                     
                 </div>
               </div>
               <div className=" border-t-2 border-black vanBold text-xl pt-4 flex justify-between items-center ">
                 <div>
                   Total: RM 0
                 </div>
                 <button
                    onClick={handleClear}
                   className="border-solid border-4 p-1 inline-block border-black text-md vanRegular self-start"
                 >
                   Clear
                 </button>
                 <button
                    onClick={handleCheckOut}
                   className="border-solid border-4 p-1 inline-block border-black text-md vanRegular self-start"
                 >
                   Checkout
                 </button>
               </div>
             </Drawer>
             <span
               className="bg-slate-900 text-white text-center inline absolute"
               style={{
                 borderRadius: "50%",
                 fontSize: "10px",
                 padding: "1px 5px",
                 top: "-10px",
                 right: "0px",
               }}
             >
               {cart.length}
             </span>
           </div>
         </div>
       <div className="flex flex-col items-end">
         <p className="text-sm">{username}</p>
         <span className="text-xs">Eco-Advocate</span>
       </div>
       <Menu as="div" className="relative">
         <div>
           <Menu.Button className="ml-2  flex ">
             <FaUserAlt size={24} />
           </Menu.Button>
         </div>
         <Transition
           as={Fragment}
           enter="transition ease-out duration-100"
           enterFrom="transform opacity-0 scale-95"
           enterTo="transform opacity-100 scale-100"
           leave="transition ease-in duration-75"
           leaveFrom="transform opacity-100 scale-100"
           leaveTo="transform opacity-0 scale-95"
         >
           <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            
                 <Menu.Item>
                   {({ active }) => (
                     <div
                       onClick={() => navigate("/myproducts")}
                       className={classNames(
                         active && "bg-gray-100",
                         "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                       )}
                     >
                       Your Listings
                     </div>
                   )}
                 </Menu.Item>
                 <Menu.Item>
                   {({ active }) => (
                     <div
                       onClick={() => navigate("/pendingapprovals")}
                       className={classNames(
                         active && "bg-gray-100",
                         "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                       )}
                     >
                       Pending Approvals
                     </div>
                   )}
                 </Menu.Item>
                 <Menu.Item>
                   {({ active }) => (
                     <div
                       onClick={() => navigate("/makeadmin")}
                       className={classNames(
                         active && "bg-gray-100",
                         "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                       )}
                     >
                       Make Admin
                     </div>
                   )}
                 </Menu.Item>
                 <Menu.Item>
                   {({ active }) => (
                     <div
                        onClick={handleSignOut}
                        className={classNames(
                         active && "bg-gray-100",
                         "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                       )}
                     >
                       Sign out
                     </div>
                   )}
                 </Menu.Item>
           </Menu.Items>
         </Transition>
       </Menu>
     </div>
   </div>
 );
}