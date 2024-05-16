import { useEffect, useState } from "react";
import { getOptions} from "./actions";
import { describe } from "node:test";
import { getFormInfo } from "../edit/actions";

interface QuestionCardProps {
  id: String;
  content: any;
  type: String | null;
  onClick: () => void;
}

export default function QuestionCard({ id, content, type, onClick }: QuestionCardProps) {
  const [options, setOptions] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchForms = await getOptions(id);
      if (fetchForms.options) {
        setOptions(fetchForms.options);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div onClick={onClick}>
        <input type='button' onClick={onClick} value={content}></input>
      
      {type !== 'text' && options.map((option) => 
      <div key={option.id}>
        <h1>{option.content}</h1>
      </div>)}
    </div>
  );
}
