"use client";

import React from "react";
import { useRouter } from "next/navigation";

const GoogleRestrictionPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-xl font-semibold text-gray-300">
          Acceso restringido
        </h1>
        <p className="text-gray-400 mt-4">
          El permiso de inicio de sesión con Google está restringido únicamente a los usuarios{" "}
          <span className="font-bold text-gray-300">@casinoexpress.com</span>.
        </p>
        <button
          onClick={() => router.push("/auth")}
          className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default GoogleRestrictionPage;
