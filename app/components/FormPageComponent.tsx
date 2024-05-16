"use client";
import { Database } from "@/types/supabase";
import Navbar from "./Navbar";
import { useQRCode } from "next-qrcode";
import CsvExportButton from "./CsvExportButton";

type FormType = Database["public"]["Tables"]["forms"]["Row"];
type ResponseType = Database["public"]["Tables"]["evaluation_responses"]["Row"];

interface FormPageComponentProps {
  form: FormType;
  responses: any;
}

export default function FormPageComponent({
  form,
  responses,
}: FormPageComponentProps) {
  const { Canvas } = useQRCode();

  console.log(responses);

  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <Navbar page="forms"></Navbar>

      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col w-1/2 justify-center">
          <div className="flex flex-col w-full justify-center items-center p-20">
            <div className="flex w-full justify-between w-full align-content-center mb-20 items-start ">
              <div className="w-8/12">
                <h1 className="mb-5 text-xl font-bold">{form.title}</h1>
                <h3>{form.description}</h3>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <Canvas
                  text={
                    form.url
                      ? form.url
                      : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  }
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
                <div className="flex gap-2">
                  <h1 className="text-xl font-bold">Status:</h1>
                  <h1
                    className={`text-xl font-bold ${
                      form.status == "Active"
                        ? `text-[#2ca02c]`
                        : `text-[#c70d00]`
                    }`}
                  >
                    {form.status}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-center">
            <CsvExportButton
              data={responses}
              filename={`${form.title} responses`}
            ></CsvExportButton>
          </div>
        </div>
      </div>
    </div>
  );
}
