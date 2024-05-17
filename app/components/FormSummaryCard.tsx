"use client";
import { getEvals } from "./actions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FormSummaryCardProps {
  id: string;
  name: string;
  status: string;
  onClick: () => void;
}

export default function FormSummaryCard({
  id,
  name,
  status,
  onClick,
}: FormSummaryCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [evals, setEvals] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //load evals on render
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
        <input
          className="text-xl font-bold hover:cursor-pointer"
          type="button"
          value={name}
          onClick={() => {
            router.push(`./myforms/${id}`);
          }}
        />
      </div>
      <div className="w-1/5 gap-2 flex flex-row max-[740px]:hidden">
        <h1 className="text-xl font-bold">Status:</h1>
        <h2
          className={`text-xl font-bold ${
            status == "Active" ? `text-[#2ca02c]` : `text-[#c70d00]`
          }`}
        >
          {status}
        </h2>
      </div>
      <div className="flex flex-row gap-4 items-center max-[1100px]:hidden">
        <h1 className="text-xl font-bold">{evals}</h1>
        <Image alt="test" src="/tick.png" width={50} height={50} />
      </div>

      <div className="flex flex-row gap-4 items-center">
        <input
          className="text-xl font-bold text-[#066fba] hover:cursor-pointer"
          type="button"
          value="Edit"
          onClick={() => {
            router.push(`./edit/${id}`);
          }}
        />
        <input
          className="text-xl font-bold text-[#c70d00] hover:cursor-pointer"
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
              onClick();

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
