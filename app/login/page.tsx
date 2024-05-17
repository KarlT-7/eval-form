"use client";
import React from "react";
import { useState } from "react";
import { login, signup } from "./actions";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login(email, password);
      // Handle successful login (e.g., redirect)
    } catch (error) {
      toast.error("there was a problem");
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      await signup(email, password);
      // Handle successful signup (e.g., redirect)
    } catch (error) {
      toast.error("there was a problem");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Welcome
        </h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {!isLoading && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogin}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        )}
        {isLoading && (
          <div>
            <style jsx>{`
              .loader {
                border: 16px solid #f3f3f3;
                border-top: 16px solid #3498db;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 2s linear infinite;
                margin: auto;
              }

              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}</style>
            <div className="loader"></div>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
