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

      // Handle successful login (e.g., redirect)
    } catch (error) {
      toast.error("there was a problem");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-1/2 m-auto gap-2">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>

      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-row justify-around">
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
      </div>
    </div>
  );
}
