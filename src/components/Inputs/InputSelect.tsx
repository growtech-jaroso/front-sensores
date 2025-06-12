import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import ErrorText from "../Errors/ErrorText.tsx";
import {ChangeEvent} from "react";

interface Props {
  register?: UseFormRegisterReturn;
  errors?: FieldError | undefined;
  label?: string;
  options: { value: string; label: string, selected?: boolean }[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function InputSelect({ register, errors, label, options, onChange }: Props) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>}
      <select
        defaultValue={options.find(option => option.selected)?.value ?? options[0].value}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
        {...register}
        onChange={onChange}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {errors && <ErrorText>{errors.message}</ErrorText>}
    </div>
  )
}