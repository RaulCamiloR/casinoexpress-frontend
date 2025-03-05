"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/constants/url";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/login`, { email, password });
      console.log("Respuesta del backend:", data);

      if (!data.ok) {
        setErrorMessage(data.message);
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      localStorage.setItem("id_token", data.id_token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      router.push("/dashboard");
    } catch (error: any) {
      const msg =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/register`, { email, password });
      console.log("Respuesta del backend:", data);

      if (!data.ok) {
        setErrorMessage(data.message);
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      setSuccessMessage(
        "Se ha enviado un código a tu correo. Haz clic en el enlace para confirmarlo."
      );
    } catch (error: any) {
      const msg =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/google`);
      console.log("Respuesta del backend:", data);
      router.push(data.authUrl);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-300">
          {isRegistering ? "Registro" : "DEMO"}
        </h2>
        {successMessage && (
          <div className="mb-4 text-center text-green-500">
            {successMessage}{" "}
            <Link
              href="/auth/confirm"
              className="text-blue-400 hover:underline font-semibold"
            >
              Confirmar código
            </Link>
          </div>
        )}
        <form onSubmit={isRegistering ? signUp : signIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="w-full mt-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-md outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full mt-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-md outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Cargando...</span>
              </div>
            ) : isRegistering ? (
              "Registrarse"
            ) : (
              "Sign in"
            )}
          </button>

          {errorMessage && (
            <div className="mt-4 text-center text-red-500">{errorMessage}</div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}
          </p>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="mt-2 text-sm text-blue-500 hover:underline"
            type="button"
          >
            {isRegistering ? "Iniciar Sesión" : "Registrate"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            ¿Tienes un código?{" "}
            <Link
              href="/auth/confirm"
              className="text-blue-500 hover:underline font-semibold"
            >
              Confirmar tu cuenta
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">O continúa con Google</p>
        </div>

        <button
          onClick={googleSignIn}
          disabled={googleLoading}
          className="w-full mt-4 flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-md shadow-md transition-all duration-300 disabled:opacity-50"
        >
          {googleLoading ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            <>
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span>Google</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
