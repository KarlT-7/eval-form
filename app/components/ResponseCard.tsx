import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { fetchOptions, upsertEvalResponse } from "./actions";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

type QuestionType = Database["public"]["Tables"]["questions"]["Row"];

interface ResponseCardProps {
  key: string;
  id: string;
  question: QuestionType;
  eval_id: string;
  form_id: string;
}



export function ResponseCard({
  key,
  id,
  question,
  eval_id,
  form_id,
}: ResponseCardProps) {
  console.log(question);
  const [textResponse, setTextResponse] = useState("");
  const [options, setOptions] = useState<Array<any>>();
  const [responses, setResponses] = useState<Array<any>>([]);

  useEffect(() => {
    const getOptions = async () => {
      const res = await fetchOptions(question.id);
      if (res.error) {
        toast.error("There was an issue fetching options.");
      } else {
        setOptions(res.data);
      }
    };

    getOptions();
  }, [question.id]);

  const handleUpsert = async () => {
    const upsert = await upsertEvalResponse(
      id,
      eval_id,
      question.id,
      form_id,
      responses,
      textResponse
    );

    if (upsert.error) {
      console.log(upsert.error);
      toast.error("Error submitting response.");
    } else {
      toast.success("Answer recorded successfully.");
    }
  };

  return (
    <div className="flex flex-col w-full border-black gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold">{question.content}</h1>
        <h1 className="text-xl font-bold">({question.type})</h1>
      </div>

      {question.type == "text" && (
        <div>
          <textarea
            className="w-full text-l bg-white border-solid border-2 rounded"
            rows={8}
            placeholder="Put your response here."
            onChange={(e) => setTextResponse(e.target.value)}
          ></textarea>
        </div>
      )}
      {question.type == "fixed" && (
        <div className="flex flex-col border-solid border-black border-4 ">
          {options?.map((option) => (
            <div
              key={option.id}
              className="flex flex-row border-solid border-black border-y-2"
            >
              <input
                className={`w-full items-start text-xl font-bold items-start ${
                  responses.includes(option) ? "bg-slate-200" : ""
                }`}
                type="button"
                value={option.option_value}
                onClick={() => {
                  setResponses([option]);
                }}
              />
            </div>
          ))}
        </div>
      )}
      {question.type == "multiple" && (
        <div className="flex flex-col border-solid border-black border-4 ">
          {options?.map((option) => (
            <div
              key={option.id}
              className="flex flex-row border-solid border-black border-y-2"
            >
              <input
                className={`w-full items-start text-xl font-bold items-start ${
                  responses.includes(option) ? "bg-slate-200" : ""
                }`}
                type="button"
                value={option.option_value}
                onClick={() => {
                  if (!responses.includes(option)) {
                    setResponses(responses?.concat(option));
                  } else {
                    const index = responses?.indexOf(option, 0);
                    if (index > -1) {
                      setResponses(
                        responses.filter((response) => response != option)
                      );
                    }
                  }
                  console.log(responses);
                }}
              />
            </div>
          ))}
        </div>
      )}

      <input
        className="text-xl font-bold bg-[#066fba] text-white p-2 px-4 rounded m-auto"
        type="button"
        onClick={() => {
          handleUpsert();
        }}
        value="Save"
      />
    </div>
  );
}
