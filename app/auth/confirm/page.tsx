"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/constants/url";

const ConfirmCodePage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);
  const [resendSuccessMessage, setResendSuccessMessage] = useState("");
  const router = useRouter();

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/confirm`, { email, code });
      if (data.ok) {
        setConfirmationSuccess(true);
      } else {
        setErrorMessage(data.message || "Error al confirmar el código");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Error al confirmar el código"
      );
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setErrorMessage("Por favor, ingresa tu email para reenviar el código.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/resend`, { email });
      if (data.ok) {
        setResendSuccessMessage(
          `Se ha enviado un nuevo código al correo ${email}. Revisa tu bandeja.`
        );
        setTimeout(() => setResendSuccessMessage(""), 5000);
      } else {
        setErrorMessage(data.message || "Error al reenviar el código");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Error al reenviar el código"
      );
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-xl">
        {confirmationSuccess ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-300">
              Confirmación Exitosa
            </h2>
            <div className="mb-6 text-center text-green-500">
              Haz sido confirmado con éxito.
            </div>
            <button
              onClick={() => router.push("/auth")}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300"
            >
              Ir a Login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-300">
              Confirmar Código
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Ingresa tu email y el código que hemos enviado a tu correo.
            </p>
            {errorMessage && (
              <div className="mb-4 text-center text-red-500">
                {errorMessage}
              </div>
            )}
            {resendSuccessMessage && (
              <div className="mb-4 text-center text-green-500">
                {resendSuccessMessage}
              </div>
            )}
            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-md outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-300"
                >
                  Código de confirmación
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-md outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !email || !code}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Confirmando..." : "Confirmar"}
              </button>
            </form>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleResend}
                disabled={loading || !email}
                className="text-sm text-orange-400 hover:underline"
              >
                Reenviar código
              </button>
              <button
                onClick={() => router.back()}
                className="text-sm text-gray-400 hover:underline"
              >
                Volver
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmCodePage;
