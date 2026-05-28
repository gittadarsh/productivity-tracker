import {

  signInWithPopup,

} from "firebase/auth";

import {

  auth,
  provider,

} from "../firebase";

import {

  useNavigate,

} from "react-router-dom";

import toast from "react-hot-toast";

export default function Login() {

  const navigate =
    useNavigate();

  const handleLogin =
    async () => {

      try {

        await signInWithPopup(
          auth,
          provider
        );

        toast.success(
          "Login successful 🚀"
        );

        navigate(
          "/onboarding"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Login failed"
        );
      }
    };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl max-w-lg w-full shadow-2xl">

        <h1 className="text-5xl font-bold text-white mb-6">

          Welcome Back 🚀

        </h1>

        <p className="text-slate-400 text-lg mb-10">

          Sign in to continue
          your productivity journey.

        </p>

        <button
          onClick={handleLogin}

          className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-5 rounded-2xl text-black font-bold text-xl"
        >

          Continue with Google

        </button>

      </div>

    </div>
  );
}