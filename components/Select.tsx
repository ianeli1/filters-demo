import { ChangeEvent } from "react";
import { Maybe } from "../utils";

interface SelectProps {
  options: string[];
  id?: number;
  onChange?: (value: string, id: number) => void;
}

export default function Select(props: SelectProps) {
  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    Maybe(props.onChange, props.options[+id], +id);
  }

  return (
    <select
      value={props.id ?? "0"}
      onChange={onSelectChange}
      className="text-black w-full h-full rounded-lg"
    >
      {props.options.map((x, i) => (
        <option value={i.toString()} key={i}>
          {x}
        </option>
      ))}
    </select>
  );
}
