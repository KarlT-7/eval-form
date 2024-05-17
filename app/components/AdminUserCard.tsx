import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import { deleteUser } from "./actions";
import { updateUser } from "./actions";
import toast from "react-hot-toast";

interface AdminUserCardProps {
  user: any;
  onDelete: () => void;
}

export default function AdminUserCard({ user, onDelete }: AdminUserCardProps) {
  const [delOpen, setDelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);

  const timestampString = user.created_at;
  const parsedDate = new Date(timestampString);

  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear().toString().slice(-2);

  const date = `${day}-${month}-${year}`;

  //handler to update user's information(email)
  const handleUpdateUser = async () => {
    const update = await updateUser(user.id, newEmail);

    if (update.error) {
      toast.error("There was a problem creating user");
    } else {
      toast.success("User successfully create.");
    }
  };

  return (
    <div
      className="w-full flex flex-row justify-around p-4 m-auto border-solid border-black border-4 rounded items-center hover:bg-slate-300 
          transition duration-300 ease-in-out"
    >
      <div className="w-1/5">
        <h1>{user.email}</h1>
      </div>
      <div className="w-1/3 max-[890px]:hidden">
        <h1>Created At: {date}</h1>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <input
          className="text-xl font-bold text-[#066fba]"
          type="button"
          value="Edit"
          onClick={() => {
            setEditOpen(true);
          }}
        />

        <input
          className="text-xl font-bold text-[#c70d00]"
          type="button"
          value="Delete"
          onClick={() => {
            setDelOpen(true);
          }}
        />
      </div>

      <Dialog
        open={delOpen}
        onClose={() => setDelOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <Button
            onClick={() => setDelOpen(false)}
            className="text-xl font-bold text-[#066fba]"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              onDelete();
              setDelOpen(false);
            }}
            className="text-xl font-bold text-[#c70d00]"
            autoFocus
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <input
            className="w-full text-l p-2 bg-white border-solid border-2 rounded"
            type="text"
            placeholder="Input an email."
            onChange={(e) => setNewEmail(e.target.value)}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEditOpen(false);
            }}
            className="text-xl font-bold text-[#066fba]"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              handleUpdateUser();
              setEditOpen(false);
            }}
            className="text-xl font-bold text-[#2ca02c]"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
