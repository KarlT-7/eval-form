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
import AdminUserCard from "./AdminUserCard";
import { addUser, deleteUser } from "./actions";

export default function AdminComponent({ users }: any) {
    console.log(users)
  const [pageUsers, setPageUsers] = useState<Array<any>>(users);
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCreate = async () => {
    const add = await addUser(newEmail, newPassword);

    // Handle successful login (e.g., redirect)
    if (add.error) {
      toast.error("There was a problem creating user");
    } else {
        toast.success('User successfully create.')
      setPageUsers(pageUsers.concat(add.data.user));
    }
  };

  const handleDelete = async (id: string) => {
    const del = await deleteUser(id);

    if (del.error) {
      toast.error("There was a problem deleting this user.");
    } else {
      if (pageUsers) {
        const newUsers = pageUsers.filter((user) => user.id != id);
        setPageUsers(newUsers);
      }
      toast.success("User successfully deleted.");
    }
  };

  const handleClickOpen = () => {
    setNewEmail("");
    setNewPassword("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <Navbar page="forms"></Navbar>
      <div className="flex flex-col justify-center m-auto items-center p-20 w-3/4 gap-4">
        {pageUsers.map((user: any) => (
          <AdminUserCard
            key={user.id}
            user={user}
            onDelete={async () => {
              handleDelete(user.id);
            }}
          ></AdminUserCard>
        ))}

        <div className="border-4 text-[25px] bg-[#2ca02c] text-white border-black p-2 border-solid rounded-lg align-center">
          <input
            className="text-xl font-bold align-center hover:cursor-pointer"
            type="button"
            value="Add User"
            onClick={handleClickOpen}
          />
        </div>
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
          <input
            className="w-full text-l p-2 bg-white border-solid border-2 rounded mb-4"
            type="text"
            placeholder="Put your description here."
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
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
