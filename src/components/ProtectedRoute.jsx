import {

  Navigate,

} from "react-router-dom";

export default function ProtectedRoute({

  user,
  children,
  requiredRole,

}) {

  /* NOT LOGGED IN */

  if (!user) {

    return (

      <Navigate to="/" />
    );
  }

  /* ROLE CHECK */

  if (

    requiredRole &&

    user.role !==
      requiredRole

  ) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-slate-900 border border-red-500 p-10 rounded-3xl text-center shadow-2xl">

          <h1 className="text-5xl font-bold text-red-500 mb-6">

            🚫 Access Denied

          </h1>

          <p className="text-2xl text-slate-300">

            You do not have permission to access this page.

          </p>

        </div>

      </div>
    );
  }

  return children;
}