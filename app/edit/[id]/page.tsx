"use client";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { addQuestion, getFormInfo, getQuestions, updateTitle } from "./actions";
import QuestionCard from "@/app/components/QuestionCard";
import { Database } from "@/types/supabase";
import toast from "react-hot-toast";

type FormType = Database["public"]["Tables"]["forms"]["Row"];
type QuestionType = Database["public"]["Tables"]["questions"]["Row"];

export default function EditPage({ params }: any) {
  const [title, setTitle] = useState<String | null>("");
  const [desc, setDesc] = useState<String | null>("");
  const [status, setStatus] = useState<String | null>("");
  const [questions, setQuestions] = useState<Array<QuestionType> | null>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();
  const [newContent, setNewContent] = useState(currentQuestion?.content);
  const [type, setType] = useState(currentQuestion?.type);
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const formData = await getFormInfo(id);
      const fetchQuestions = await getQuestions(id);
      if (formData && fetchQuestions.data) {
        setQuestions(fetchQuestions.data);
        setTitle(formData.title);
        setDesc(formData.description);
        setStatus(formData.status);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleCreate = async (content: String) => {
    const res = await addQuestion(content);

    if (res.error) {
    }
  };

  const handleTitleUpdate = async (id: String, title: String) => {
    const res = await updateTitle(id, title);

    if (res.error) {
        console.log(res.error)
        toast.error('Error saving title.')
    } else {
        toast.success('Title saved.')
    }

  }

  return (
    <div>
      <Navbar page="edit"></Navbar>
      {!loading && (
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 min-h-full bg-white border-solid border-2 border-black p-4 gap-4">
            <div className="flex flex-row">
              <input
                className="w-full text-l p-2 bg-white border-black border-b-solid border-2 rounded rounded-r-none"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input className="p-2 rounded-r border-black border-solid border-1 bg-[#066fba] font-bold text-l text-white" type="button" value="Save" onClick={() => handleTitleUpdate(id, title)}/>
            </div>

            <textarea
              className="w-full text-l p-2 bg-white border-black border-solid border-2 rounded mb-4"
              rows={8}
              placeholder="Put your description here."
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <div className="flex flex-row justify-center">
              <input
                type="button"
                className={`p-2 text-xl font-bold border-2 border-gray-400 rounded-l-lg text-[#2ca02c] ${
                  status == "Active" ? "bg-slate-200" : ""
                } hover:bg-slate-100 
                transition duration-100 ease-in-out`}
                value="Active"
                onClick={() => {
                  setStatus("Active");
                }}
              />
              <input
                type="button"
                className={`p-2 text-xl font-bold border-2 border-gray-400 border-l-0 rounded-r-lg text-[#c70d00] ${
                  status == "Disabled" ? "bg-slate-200" : ""
                } hover:bg-slate-100 
                transition duration-100 ease-in-out`}
                value="Disabled"
                onClick={() => {
                  setStatus("Disabled");
                }}
              />
            </div>

            <h1 className="text-xl text-black">Questions:</h1>

            {questions?.length !== 0 &&
              questions?.map((question) => (
                <div key={question.id}>
                  <QuestionCard
                    key={question.id}
                    id={question.id}
                    content={question.content}
                    type={question.type}
                    onClick={() => {
                      setCurrentQuestion(question);
                      setNewContent(question.content);
                      setType(question.type);
                    }}
                  ></QuestionCard>
                </div>
              ))}

            {questions?.length == 0 && (
              <div>
                <h1>No questions in this form.</h1>
              </div>
            )}

            <div className="border-4 text-[25px] bg-[#2ca02c] text-white border-black w-fit px-2 border-solid rounded-lg self-center align-center">
              <input
                className="text-xl font-bold align-center hover:cursor-pointer"
                type="button"
                value="Add a question"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 min-h-full bg-white border-solid border-2 border-black">
            {currentQuestion && (
              <div className="flex flex-col min-h-full bg-white border-solid border-l-2 border-black p-4 gap-4">
                <input
                  className="w-full text-l p-2 bg-white border-black border-b-solid border-b-2 mb-4"
                  type="text"
                  value={newContent}
                />

                <div className="flex flex-row justify-center">
                  <input
                    type="button"
                    className={`p-2 text-xl font-bold border-2 border-gray-400 rounded-l-lg text-[#2ca02c] ${
                      type == "fixed" ? "bg-slate-200" : ""
                    } hover:bg-slate-100 
                transition duration-100 ease-in-out`}
                    value="Fixed"
                    onClick={() => {
                      setType("fixed");
                    }}
                  />
                  <input
                    type="button"
                    className={`p-2 text-xl font-bold border-2 border-gray-400 border-l-0 text-[#c70d00] ${
                      type == "multiple" ? "bg-slate-200" : ""
                    } hover:bg-slate-100 
                transition duration-100 ease-in-out`}
                    value="Multiple Choice"
                    onClick={() => {
                      setType("multiple");
                    }}
                  />
                  <input
                    type="button"
                    className={`p-2 text-xl font-bold border-2 border-gray-400 border-l-0 rounded-r-lg text-[#066fba] ${
                      type == "text" ? "bg-slate-200" : ""
                    } hover:bg-slate-100 
                transition duration-100 ease-in-out`}
                    value="Text"
                    onClick={() => {
                      setType("text");
                    }}
                  />
                </div>
              </div>
            )}
            {!currentQuestion && (
              <div className="flex h-full self-center items-center">
                <h1>No Question Selected</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
