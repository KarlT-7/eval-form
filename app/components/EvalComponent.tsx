"use client";
import { Database } from "@/types/supabase";
import { useState } from "react";
import { upsertEval } from "./actions";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { ResponseCard } from "./ResponseCard";

interface EditPageComponentProps {
  form: FormType;
  questionData: Array<QuestionType>;
}

type FormType = Database["public"]["Tables"]["forms"]["Row"];
type QuestionType = Database["public"]["Tables"]["questions"]["Row"];

const id = uuidv4()

export function EvalComponent({ form, questionData }: EditPageComponentProps) {
  const [evalName, setEvalName] = useState("");
  const [loadQuestions, setLoadQuestions] = useState(false);

  const handleEvalUpsert = async () => {
    
    const upsert = await upsertEval(id, form.id, evalName);

    if (upsert.error) {
      toast.error("There was an error creating evaluation.");
    } else {
      toast.success("Evaluation started.");
      setLoadQuestions(true);
    }
  };
  return (
    <div className="flex w-full justify-center items-center p-6">
      <div className="flex flex-col w-1/3 justify-center items-center m-auto gap-6">
        <input
          type="text"
          className="w-full text-xl p-2 bg-white border-solid border-2 rounded"
          onChange={(e) => {
            setEvalName(e.target.value);
          }}
          placeholder="Enter your name."
        />
        <div className="flex w-full items-center justify-center">
          <input
            className="text-xl font-bold bg-[#066fba] text-white p-2 rounded m-auto"
            type="button"
            onClick={handleEvalUpsert}
            value="Save"
          />
        </div>
        {!loadQuestions && (
          <h1 className="">(Enter your name to begin evaluation)</h1>
        )}

        {loadQuestions && questionData.map((question) => <ResponseCard key={question.id} question={question} eval_id={id} form_id={form.id}></ResponseCard>)}
      </div>
    </div>
  );
}
