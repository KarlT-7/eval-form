"use client";
import { Database } from "@/types/supabase";
import Navbar from "./Navbar";
import { useQRCode } from "next-qrcode";

export default function FormPageComponent({ form }: any) {
  console.log(form);
  const { Canvas } = useQRCode();

  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <Navbar page="forms"></Navbar>

      <div className="flex w-full items-center justify-center">
        <div className="flex w-1/2">
          <div className="flex w-full justify-center items-center p-20">
            <div className="flex w-full justify-between w-full align-content-center mb-20 items-start ">
              <div className="headtext">
                <h1 className="mb-5 text-xl font-bold">{form.title}</h1>
                <h3>{form.description}</h3>
              </div>
              <div className="flex flex-col gap-4">
                <Canvas
                  text={"https://github.com/bunlong/next-qrcode"}
                  options={{
                    errorCorrectionLevel: "M",
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                      dark: "#000000",
                      light: "#FFFFFF",
                    },
                  }}
                />
                <div className="flex gap-4 px-4">
                  <h1 className="text-xl font-bold">Status:</h1>
                  <h1 className={`text-xl font-bold ${form.status == "Active" ? `text-[#2ca02c]` : `text-[#c70d00]`}`}>Active</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
