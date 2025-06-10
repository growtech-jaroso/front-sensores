import { HTMLInputTypeAttribute, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import ErrorText from "../Errors/ErrorText";
import { Eye, EyeClosed } from "lucide-react";

interface Props {
  isShowing?: boolean;
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  placeholder: string;
}

export default function InputPasswordUser({ isShowing = false, register, errors, placeholder }: Props) {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(isShowing ? "text" : "password");

  const handleShowPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type={inputType}
          autoComplete="off"
          placeholder={placeholder}
          {...register}
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={handleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
        >
          {inputType === "password" ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {errors && <ErrorText>{errors.message}</ErrorText>}
    </div>
  );
}
