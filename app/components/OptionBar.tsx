import { Database } from "@/types/supabase";
import { useState } from "react";
import { updateValue } from "./actions";
import toast from "react-hot-toast";

type OptionType = Database["public"]["Tables"]["options"]["Row"];

interface OptionBarProps {
    option: OptionType;
    onDelete: () => void;
  }

export default function OptionBar({option, onDelete}: OptionBarProps) {
    const [value, setValue] = useState<string>(option.option_value);

    const handleUpdateOptionValue = async () => {
        const res = await updateValue(option.id, value);

        if (res.error) {
            console.log(res.error);
            toast.error("Error saving value.");
          } else {
            toast.success("Value saved.");
          }
    }

  return (
    <div className="flex flex-row">
      <input
        className="w-full text-l p-2 bg-white border-black border-b-solid border-2 rounded rounded-r-none"
        type="text"
        value={value}
        onChange={(e) => {setValue(e.target.value)}}
      />
      <input
        className="p-2 border-black border-solid border-1 bg-[#066fba] font-bold text-l text-white"
        type="button"
        value="Save"
        onClick={async () => {
            handleUpdateOptionValue();
        }}
      />
      <input
        className="p-2 px-4 rounded-r border-black border-solid border-1 bg-[#c70d00] font-bold text-l text-white"
        type="button"
        value="X"
        onClick={async () => {
          onDelete();
        }}
      />
    </div>
  );
}
