import { ImLocation2 } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";
import LoadingSpinner from "../components/utilities/LoadingSpinner";


const Contact = () => {
 const [iframeLoaded, setIframeLoaded] = useState(false);


 return (
   <div
     style={{ backgroundColor: "rgb(196,243,199)" }}
     className="p-12 text-center flex flex-col items-center"
   >
     <div className="w-4/5">
       <div className="mb-8">
         <h1 className="text-7xl vanBold mb-8">Contact Us</h1>
         <div className="py-8 px-4 bg-white rounded-xl flex gap-6 justify-evenly w-4/5 mx-auto  mb-8">
           <div>
             <div className="flex gap-2 items-center">
               <ImLocation2 size={24} />
               <h1 className="vanBold text-xl">Physical Address</h1>
             </div>


             <p>5, Jalan Puteri 4/7a, Bandar Puteri,<br></br> 47100 Puchong, Selangor</p>
           </div>
           <div>
             <div className="flex gap-2 items-center">
               <FaPhone size={24} />
               <h1 className="vanBold text-xl">Phone Number</h1>
             </div>
             <p>+60163828823</p>
           </div>
           <div>
             <div className="flex gap-2 items-center">
               <MdEmail size={24} />
               <h1 className="vanBold text-xl">Email Address</h1>
             </div>
             <p>academy.coderangers@gmail.com</p>
           </div>
         </div>
         <p className="text-2xl">
           Feel free to reach out to us. We're here to assist and collaborate
           on our mission to combat food waste together.
         </p>
       </div>
       <div className="flex">
         <div className="w-3/5">
           {iframeLoaded ? null : <LoadingSpinner />}{" "}
           {/* Display spinner while iframe is loading */}
           <iframe
             width="100%"
             height="100%"
             frameborder="0"
             marginheight="0"
             marginwidth="0"
             title="map"
             scrolling="no"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.713013999265!2d101.62364431431644!3d3.0274667544809644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4986f93a191f%3A0x94dbb7c85d4a5972!2sNo.%205%2C%20Jalan%20Puteri%204%2F7A%2C%20Bandar%20Puteri%2C%2047100%20Puchong%2C%20Selangor%2C%20Malaysia!5e0!3m2!1sen!2smy!4v1669449975303!5m2!1sen!2smy"
             className="rounded-lg"
             onLoad={() => setIframeLoaded(true)} // Set loading state to false after iframe is loaded
           ></iframe>
         </div>
         <form className="flex flex-col gap-8 items-start bg-white p-8 rounded-lg w-2/5">
           <div className="flex flex-col items-start gap-2">
             <h2 className="vanBold text-3xl mb-6">Send Us a Message</h2>
             <label htmlFor="name" className="vanBold text-xl">
               Full Name
             </label>
             <input
               id="name"
               type="text"
               className="bg-slate-100 w-full rounded border border-gray-300 p-2"
             />
           </div>
           <div className="flex flex-col items-start gap-2">
             <label htmlFor="email" className="vanBold text-xl">
               Email
             </label>
             <input
               id="email"
               type="email"
               className="bg-slate-100 w-full rounded border border-gray-300 p-2"
             />
           </div>
           <div className="flex flex-col items-start gap-2">
             <label htmlFor="subject" className="vanBold text-xl">
               Subject
             </label>
             <input
               id="subject"
               type="text"
               className="bg-slate-100 w-full rounded border border-gray-300 p-2"
             />
           </div>
           <div className="flex flex-col items-start gap-2">
             <label htmlFor="message" className="vanBold text-xl">
               Message
             </label>
             <textarea
               id="message"
               cols="30"
               rows="5"
               className="bg-slate-100 w-full rounded border border-gray-300 p-2"
             ></textarea>
           </div>
           <div>
             <button
               type="submit"
               className="vanBold text-xl border-solid border-4 p-2 inline-block border-black"
             >
               Submit
             </button>
           </div>
           <p> We will do our best to reply within 2-3 business days.</p>
         </form>
       </div>
     </div>
   </div>
 );
};


export default Contact;