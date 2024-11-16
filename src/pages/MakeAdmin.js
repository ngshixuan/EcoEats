import React, { useState } from "react";
import { auth, functions } from "../firebase/firebase-config";
import { httpsCallable } from "firebase/functions";
import {message } from "antd";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMakeAdmin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (user) {
        const makeAdminCallable = httpsCallable(functions, "addAdminRole");
        const result = await makeAdminCallable({ email });

        console.log(result.data.message);
        message.success(`Successfully made ${email} admin`);
        setEmail(""); // Reset the form
      } else {
        message.error("User not authenticated");
      }
    } catch (error) {
      message.error(`Error making admin: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(196,243,199)" }} className="p-12 flex justify-center flex-col">
      <h1 className="vanBold text-5xl text-center mb-8">Make Admin</h1>
      <form className="flex flex-col gap-8 items-start bg-white p-8 rounded-lg w-2/5 self-center" onSubmit={handleMakeAdmin}>
        <div className="flex flex-col items-start gap-2 ">
          <label htmlFor="email" className="vanBold text-xl">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="bg-slate-100 w-full rounded border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="vanBold text-xl border-solid border-4 p-2 inline-block border-black"
            disabled={loading}
          >
             {loading ? "Loading..." : "Make Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAdmin;