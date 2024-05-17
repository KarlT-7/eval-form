"use client";
import { useEffect, useState } from "react";
import { checkAdmin, signOut } from "./actions";

interface PageProps {
  page?: string;
}

export default function Navbar({ page }: PageProps) {
  const [userRole, setUserRole] = useState<string | null>(null);

  //handler for sign out button
  const handleSignOut = async () => {
    await signOut();
  };

  //check user's role on render
  useEffect(() => {
    const fetchData = async () => {
      const role = await checkAdmin();
      if (role) {
        setUserRole(role);
      }
    };

    fetchData();
  }, []);

  return (
    
    <nav className="flex justify-around items-center bg-[#d8d8d8] border-b-2 border-solid border-black py-2 px-4 text-center w-full">
      <div className="w-1/5 content-center">
        <a href="/myforms">
          <h1
            className={`text-[3.5em] font-bold text-black m-0 text-gray-800 hover:text-shadow-lg underline-animation ${
              page === "home"
                ? "underline decoration-black decoration-4 underline-offset-4"
                : ""
            }`}
          >
            EvalForm
          </h1>
        </a>
      </div>

      <div className="flex flex-row w-1/6 justify-around">
        {userRole === "admin" && (
          <div className="text-lg font-bold text-blue-500 bg-transparent border border-blue-500 rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
            <a href="/admin">
              <h1 className="font-bold">Admin</h1>
            </a>
          </div>
        )}

        <input
          type="button"
          value="Sign Out"
          className="text-lg font-bold text-red-500 bg-transparent border border-red-500 rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
          onClick={handleSignOut}
        />
      </div>
    </nav>
  );
}
