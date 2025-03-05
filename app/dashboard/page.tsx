"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/"); 
  };

  useEffect(() => {
    const id_token = localStorage.getItem("id_token");
    if (!id_token) router.push("/auth");
    setLoading(false);
  }, []);

  if (!loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-300 mb-6">Dashboard</h2>
          <div className="p-4">
            <p className="text-gray-400">Beautiful Content</p>
          </div>
          <button
            onClick={logout}
            className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }
};

export default DashboardPage;
