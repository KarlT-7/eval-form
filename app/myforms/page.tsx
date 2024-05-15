"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FormSummaryCard from "../components/FormSummaryCard";
import { createForm, deleteForm, getForms } from "./actions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";


export default function MyForms() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState<Array<any> | null>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: String) => {
    const res = await deleteForm(id);

    if (res.error) {
      toast.error("There was a problem deleting this form.");
    } else {
      if (forms) {
        setForms(forms.filter((form) => form.id != id));
      }
      toast.success("Form successfully deleted.");
    }
  };

  const handleCreate = async () => {
    const res = await createForm(title, description, status);
    
    if (res.error) {
      console.log(res.error.message)
      toast.error("There was a problem creating this form.");
    } else if(res.status == 201) {
      //forms?.push(res.data);
      router.refresh();
    }
    
  };

  const handleClickOpen = () => {
    setStatus("");
    setTitle("");
    setDescription("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchForms = await getForms();
      if (fetchForms.data) {
        setForms(fetchForms.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <Navbar page="forms"></Navbar>

      <div className="flex flex-col justify-center m-auto items-center p-20 w-3/4 gap-4">
        {isLoading && (
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

        {forms &&
          !isLoading &&
          forms.map((form) => (
            <FormSummaryCard
              key={form.id}
              id={form.id}
              name={form.title}
              status={form.status}
              onClick={async () => {
                handleDelete(form.id);
              }}
            ></FormSummaryCard>
          ))}

        <div className="border-4 text-[25px] bg-[#2ca02c] text-white border-black p-2 border-solid rounded-lg align-center">
          <input
            className="text-xl font-bold align-center hover:cursor-pointer"
            type="button"
            value="Create New Form"
            onClick={handleClickOpen}
          />
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <input
              className="w-full text-l p-2 bg-white border-solid border-2 rounded mb-4"
              type="text"
              placeholder="Input a title."
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <textarea
              className="w-full text-l p-2 bg-white border-solid border-2 rounded mb-4"
              rows={8}
              placeholder="Put your description here."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="text-xl font-bold text-[#066fba]"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await handleCreate();
                handleClose();
              }}
              className="text-xl font-bold text-[#2ca02c]"
              autoFocus
            >
              Create Form
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
