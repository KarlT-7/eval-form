"use client";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import {
  addOption,
  addQuestion,
  deleteOption,
  fetchOptions,
  getFormInfo,
  getQuestions,
  updateContent,
  updateTitle,
  changeStatus,
  updateType,
  deleteQuestion,
  updateDescription,
} from "./actions";
import QuestionCard from "@/app/components/QuestionCard";
import { Database } from "@/types/supabase";
import toast from "react-hot-toast";
import OptionBar from "@/app/components/OptionBar";

type FormType = Database["public"]["Tables"]["forms"]["Row"];
type QuestionType = Database["public"]["Tables"]["questions"]["Row"];
type OptionType = Database["public"]["Tables"]["options"]["Row"];

interface EditPageComponentProps {
  form: FormType;
  questionData: Array<QuestionType>;
}

export default function EditPageComponent({
  form,
  questionData,
}: EditPageComponentProps) {
  const [title, setTitle] = useState(form.title);
  const [desc, setDesc] = useState(form.description);
  const [currentOptions, setCurrentOptions] = useState<Array<any>>();
  const [status, setStatus] = useState<string>(form.status);
  const [questions, setQuestions] = useState<Array<QuestionType>>(questionData);
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [newContent, setNewContent] = useState<any>(currentQuestion?.content);
  const [type, setType] = useState(currentQuestion?.type);
  const id = form.id;

  const handleStatusChange = async (status: string) => {
    const res = await changeStatus(id, status);

    if (res.status == 204) {
      toast.success("Status updated.");
      setStatus(status);
    } else {
      toast.error("There was an error updating the status.");
    }
  };

  const handleCreateQuestion = async () => {
    const res = await addQuestion(id);

    if (res.error) {
      toast.error("There was an error creating question.");
    } else if (res.data) {
      setQuestions(questions.concat(res.data));
    }
  };

  const getOptions = async (id: String) => {
    setLoadingOptions(true);
    const res = await fetchOptions(id);
    if (res.error) {
      toast.error("There was an issue fetching options.");
    } else {
      setCurrentOptions(res.data);
    }
    setLoadingOptions(false);
  };

  const handleTitleUpdate = async (id: String, title: String) => {
    const res = await updateTitle(id, title);

    if (res.error) {
      toast.error("Error saving title.");
    } else {
      toast.success("Title saved.");
    }
  };

  const handleUpdateDescription = async (id: String, description: String) => {
    const res = await updateDescription(id, description);

    if (res.error) {
      toast.error("Error saving description.");
    } else {
      toast.success("Description saved.");
    }
  };

  const handleContentUpdate = async (
    question_id: String,
    question_content: string | null
  ) => {
    const res = await updateContent(question_id, question_content);

    if (res.error) {
      console.log(res.error);
      toast.error("Error saving content.");
    } else if (res.data) {
      toast.success("Content saved.");
    }
  };

  const handleCreateOption = async (question_id: String) => {
    const res = await addOption(question_id);

    if (res.error) {
      toast.error("There was an error creating option.");
    } else if (res.data) {
      setCurrentOptions(currentOptions?.concat(res.data));
    }
  };

  const handleDeleteOption = async (id: String) => {
    const res = await deleteOption(id);
    if (res.error) {
      toast.error("There was an error deleting this option.");
    } else {
      setCurrentOptions(currentOptions?.filter((option) => option.id != id));
      toast.success("Option successfully deleted.");
    }
  };

  const handleUpdateType = async (
    question_id: string,
    type: "fixed" | "multiple" | "text"
  ) => {
    const res = await updateType(question_id, type);
    if (res.error) {
      toast.error("There was an error changing question type.");
    } else {
      if (type == "text") {
        setCurrentOptions([]);
      }
      setType(type);
    }
  };

  const handleDeleteQuestion = async (question_id: string) => {
    const res = await deleteQuestion(question_id);

    if (res.error) {
      toast.error("There was an issue deleting this question.");
    } else {
      setQuestions(questions.filter((question) => question.id != question_id));
      setCurrentQuestion(null);
      toast.success("Question deleted successfully.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar page="edit"></Navbar>
      {!loading && (
        <div className="flex flex-grow min-h-full overflow-hidden bg-white">
          <div className="flex flex-col w-1/2 min-h-full bg-white border-solid border-r-2 border-black p-4 gap-2">
            <h1 className="text-xl text-black font-bold">Form Title:</h1>
            <div className="flex flex-row pb-8">
              <input
                className="w-full text-l bg-white border-black border-b-solid border-2 rounded rounded-r-none p-2"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="p-2 rounded-r border-black border-solid border-1 bg-[#066fba] font-bold text-l text-white"
                type="button"
                value="Save"
                onClick={() => handleTitleUpdate(id, title)}
              />
            </div>

            <h1 className="text-xl text-black font-bold">Form Description:</h1>
            <textarea
              className="w-full text-l p-2 bg-white border-black border-solid border-2 rounded "
              rows={8}
              placeholder="Put your description here."
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <div className="border-4 text-[25px] bg-[#066fba] text-white border-black w-fit px-2 border-solid rounded-lg self-center align-center mb-10">
              <input
                className="text-xl font-bold align-center hover:cursor-pointer"
                type="button"
                value="Save Description"
                onClick={() => {
                  handleUpdateDescription(form.id, desc);
                }}
              />
            </div>
            <div className="flex flex-row justify-center pb-10">
              <input
                type="button"
                className={`p-2 text-xl font-bold border-2 border-gray-400 rounded-l-lg text-[#2ca02c] ${
                  status == "Active" ? "bg-slate-200" : ""
                } hover:bg-slate-100 
                transition duration-100 ease-in-out`}
                value="Active"
                onClick={() => {
                  handleStatusChange("Active");
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
                  handleStatusChange("Disabled");
                }}
              />
            </div>
            <div className="flex flex-col w-full justify-center items">
              <h1 className="text-xl text-black font-bold">Questions:</h1>
              <div className="overflow-y-auto">
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
                          getOptions(question.id);
                        }}
                      ></QuestionCard>
                    </div>
                  ))}
              </div>
            </div>

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
                onClick={() => {
                  handleCreateQuestion();
                }}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 bg-white border-solid border-l-2 border-black p-4 gap-4">
            {currentQuestion && (
              <div className="p-6">
                <div className="flex w-full justify-center">
                  <div className="border-4 text-[25px] bg-[#c70d00] text-white border-black w-fit px-2 border-solid rounded-lg self-center align-center">
                    <input
                      className="text-xl font-bold align-center hover:cursor-pointer"
                      type="button"
                      value="Delete this questions"
                      onClick={() => {
                        handleDeleteQuestion(currentQuestion.id);
                      }}
                    />
                  </div>
                </div>
                <h1 className="text-xl text-black py-2">Question Content:</h1>
                <div className="flex flex-row">
                  <input
                    className="w-full text-l p-2 bg-white border-black border-b-solid border-2 rounded rounded-r-none"
                    type="text"
                    value={newContent}
                    onChange={(e) => {
                      setNewContent(e.target.value);
                    }}
                  />
                  <input
                    className="p-2 rounded-r border-black border-solid border-1 bg-[#066fba] font-bold text-l text-white"
                    type="button"
                    value="Save"
                    onClick={async () => {
                      handleContentUpdate(currentQuestion.id, newContent);
                    }}
                  />
                </div>

                <div className="flex flex-row justify-center p-6">
                  <input
                    type="button"
                    className={`p-2 text-xl font-bold border-2 border-gray-400 rounded-l-lg text-[#2ca02c] ${
                      type == "fixed" ? "bg-slate-200" : ""
                    } hover:bg-slate-100 
                transition duration-100 ease-in-out`}
                    value="Fixed"
                    onClick={() => {
                      handleUpdateType(currentQuestion.id, "fixed");
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
                      handleUpdateType(currentQuestion.id, "multiple");
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
                      handleUpdateType(currentQuestion.id, "text");
                    }}
                  />
                </div>
                {loadingOptions && (
                  <>
                    <style jsx>{`
                      .loader {
                        border: 16px solid #f3f3f3;
                        border-top: 16px solid #3498db;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
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
                  </>
                )}
                {!loadingOptions && type != "text" && (
                  <div>
                    <h1 className="text-xl text-black pb-2">Options:</h1>

                    {currentOptions?.length != 0 && (
                      <div>
                        {currentOptions?.map((option: OptionType) => (
                          <div key={option.id} className="py-1">
                            <OptionBar
                              option={option}
                              onDelete={async () => {
                                handleDeleteOption(option.id);
                              }}
                            ></OptionBar>
                          </div>
                        ))}
                      </div>
                    )}
                    {currentOptions?.length == 0 && (
                      <div className="flex content-center">
                        <h1 className="text-l">
                          There are not options for this question.
                        </h1>
                      </div>
                    )}

                    <div className="flex w-full justify-center p-2">
                      <div className="border-4 text-[25px] bg-[#2ca02c] text-white border-black w-fit px-2 border-solid rounded-lg self-center align-center">
                        <input
                          className="text-xl font-bold align-center hover:cursor-pointer"
                          type="button"
                          value="Add an option"
                          onClick={() => {
                            handleCreateOption(currentQuestion.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
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
