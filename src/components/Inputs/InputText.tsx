import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {HTMLInputTypeAttribute} from "react";

interface Props {
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  label: string;
  type?: HTMLInputTypeAttribute;
}

export default function InputText({register, errors, label, type = "text"}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        {...register}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
    </div>
  )
}