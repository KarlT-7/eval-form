"use client";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FormSummaryCard from "./FormSummaryCard";
import { createForm, deleteForm, getForms } from "../myforms/actions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import toast from "react-hot-toast";
import { redirect, usePathname } from "next/navigation";
import { Database } from "@/types/supabase";
import { useQRCode } from "next-qrcode";
import { createClient } from "@/utils/supabase/server";
import AdminUserCard from "./AdminUserCard";
import { signup } from "../login/actions";

export default function AdminComponent({ users }: any) {
  const [pageUsers, setPageUsers] = useState(users);
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClickOpen = () => {
    setNewEmail("");
    setNewPassword("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    try {
        await signup(newEmail, newPassword);
  
        // Handle successful login (e.g., redirect)
      } catch (error) {
        toast.error("there was a problem");
      }
    
  };

  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <Navbar page="forms"></Navbar>
      {users.map((user: any) => (
        <AdminUserCard key={user.id} user={user}></AdminUserCard>
      ))}
      <div className="border-4 text-[25px] bg-[#2ca02c] text-white border-black p-2 border-solid rounded-lg align-center">
        <input
          className="text-xl font-bold align-center hover:cursor-pointer"
          type="button"
          value="Add User"
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
            placeholder="Input an email."
            onChange={(e) => setNewEmail(e.target.value)}
          ></input>
          <textarea
            className="w-full text-l p-2 bg-white border-solid border-2 rounded mb-4"
            rows={8}
            placeholder="Put your description here."
            onChange={(e) => setNewPassword(e.target.value)}
          ></textarea>
          
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
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
