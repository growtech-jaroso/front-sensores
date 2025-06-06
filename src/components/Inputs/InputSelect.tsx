import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import ErrorText from "../Errors/ErrorText.tsx";

interface Props {
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  label: string;
  options: { value: string; label: string, selected?: boolean }[];
}

export default function InputSelect({ register, errors, label, options }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <select
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
        {...register}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} selected={option.selected}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && <ErrorText>{errors.message}</ErrorText>}
    </div>
  )
}