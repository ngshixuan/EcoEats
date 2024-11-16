import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import background from "../assets/images/background.webp";
import { useState } from "react";
import { db, auth } from "../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async() =>{
    try {
      setLoading(true);

      if(!email || !password){
        setError("Please enter both email and password");

        setTimeout(()=>{
          setLoading(false);
        },500)
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      setError(null);
      navigate("/");
    } 
    catch (error) {
      setError(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <section
      className="h-screen flex flex-col md:flex-row justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col md:flex-row border items-center rounded-lg bg-white ">
        <div className="md:w-1/3 max-w-sm flex justify-center md:border-r-2 flex-1">
          <img src={logo} className="w-36 md:w-72 " alt="" />
        </div>
        <div className="md:w-1/3 max-w-sm  flex-1 p-6">
          <div className="flex items-end ">
            <label className="font-medium text-3xl block md:inline w-full md:w-auto text-center vanBold">
              My Eco Eats
            </label>
          </div>
          <div className="mt-2 mb-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Email Address"
              name="emailInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              name="passwordInput"
              onChange={(e) => setPassword(e.target.value)}
            />

            {loading ? (
                <button
                  className="vanBold mt-4 text-xl border-solid border-4 p-2 inline-block border-gray cursor-not-allowed text-gray-500"
                  type="button"
                  disabled
                >
                  Loading...
                </button>
            ):(
              <button
                className="vanBold mt-4 text-xl border-solid border-4 p-2 inline-block border-black"
                type="submit"
                onClick={signIn}
              >
                Login
              </button>
            )}

              
              <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                Don't have an account?{" "}
                <Link
                  className="text-red-600 hover:underline hover:underline-offset-4"
                  to="/register"
                >
                  Register
                </Link>
              </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </section>
  );
};

export default Login;