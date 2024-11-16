import { Link } from "react-router-dom";

const Footer = () => {
 return (
   <div className="bg-black">
     <div className="p-12">
       <div className="text-gray-900 bg-white p-2 text-3xl inline-block vanBold">
         MyEcoEats.com
       </div>
       <p className="text-white my-8 ">
         At MyEcoEats, we prioritize the well-being of our community. To ensure
         a secure and healthy environment, our dedicated team reviews each ad
         listing diligently. Any content that doesn't meet food safety
         regulations will be promptly removed.
       </p>
       <div className="flex items-center gap-24  text-2xl text-white my-8">
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
         <div>
           <Link to="/sell">Sell</Link>
         </div>
       </div>
       <p className="text-white text-xl">© 2024 My Eco Eats</p>
     </div>
   </div>
 );
};


export default Footer;