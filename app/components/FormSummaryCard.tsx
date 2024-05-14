"use client";
import { deleteForm, getEvals } from "./actions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormSummaryCardProps {
  id: String;
  name: String;
  status: String;
}

export default function FormSummaryCard({
  id,
  name,
  status,
}: FormSummaryCardProps) {

  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [evals, setEvals] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const count = await getEvals(id);
      if (count) {
        setEvals(count);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div
      className="w-full flex flex-row justify-around p-4 m-auto border-solid border-black border-4 rounded items-center hover:bg-slate-300 
    transition duration-300 ease-in-out"
    >
      <div className="w-1/5">
        <h1 className="text-xl font-bold">{name}</h1>
      </div>
      <div className="w-1/5 gap-4 flex flex row">
        <h1 className="text-xl font-bold">Status:</h1>
        <h2
          className={`text-xl font-bold ${
            status == "Active" ? `text-[#2ca02c]` : `text-[#c70d00]`
          }`}
        >
          {status}
        </h2>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <h1 className="text-xl font-bold">{evals}</h1>
        <Image alt="test" src="/tick.png" width={50} height={50} />
      </div>
      <Image
        alt="qr code"
        src="/qr.png"
        className="m-0"
        width={40}
        height={40}
      />
      <div className="flex flex-row gap-4 items-center">
        <input
          className="text-xl font-bold text-[#066fba]"
          type="button"
          value="Edit"
          onClick={() => {
            router.push(`${id}`);
          }}
        />
        <input
          className="text-xl font-bold text-[#c70d00]"
          type="button"
          onClick={handleClickOpen}
          value="Delete"
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this form? Once deleted, the form
            cannot be recovered.
          </DialogContentText>
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
              const res = await deleteForm(id);

              if (res.error) {
                toast.error("There was a problem deleting this form.");
              } else {
                router.refresh()
              }

              handleClose();
            }}
            className="text-xl font-bold text-[#c70d00]"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}