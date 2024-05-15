'use client'
import { useEffect, useState } from "react";
import { checkAdmin, signOut } from "./actions";
import toast from "react-hot-toast";

interface PageProps {
  page: string;
}

export default function Navbar({ page }: PageProps) {
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
  };

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
    <nav className="flex justify-around flex-row bg-white border-b-2 border-solid border-black py-2 px-0 text-center w-full m-0">
      <div className="w-1/5 content-center">
        <a href="/home">
          <h1
            className={`text-[3.5em] font-bold text-black m-0 ${
              page === "home"
                ? "underline decoration-black decoration-4 underline-offset-4"
                : ""
            }`}
          >
            EvalForm
          </h1>
        </a>
      </div>
      <div className="w-1/5 content-center">
        <a href="/myforms">
          <h1
            className={`text-[2em] font-bold text-black m-0 ${
              page === "forms"
                ? "underline decoration-black decoration-4 underline-offset-4"
                : ""
            }`}
          >
            My Forms
          </h1>
        </a>
      </div>

      <div className="flex flex-row w-1/4 align-center content-center gap-5">
        {userRole === "admin" && (
          <a href="./admin" className="content-center">
            <h1 className="text-[1.5em] font-bold text-[#066fba]">Admin</h1>
          </a>
        )}
        <input
          type="button"
          value="Sign Out"
          className="text-[1.5em] font-bold text-[#c70d00]"
          onClick={handleSignOut}
        />
      </div>
    </nav>
  );
}
