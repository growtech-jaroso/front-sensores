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

export default function InputPassword({
  isShowing = false,
  register,
  errors,
  placeholder,
}: Props) {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(
    isShowing ? "text" : "password"
  );

  const handleShowPassword = (e: React.MouseEvent) => {
    e.preventDefault(); // ✅ Prevenir cualquier acción por defecto
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="mb-5 pb-2">
      <div className="relative m-0 p-0">
        <input
          type={inputType}
          autoComplete="off"
          placeholder={placeholder}
          {...register}
          className="w-full px-6 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-lg focus:outline-none focus:border-green-500 focus:bg-white"
        />
        <button
          type="button" // ✅ Asegura que no sea submit
          tabIndex={-1}
          onClick={handleShowPassword}
          className="absolute right-2 top-4 cursor-pointer"
        >
          {inputType === "password" ? (
            <EyeClosed className="size-8 hover:text-green-600" />
          ) : (
            <Eye className="size-8 hover:text-green-600" />
          )}
        </button>
      </div>
      {errors && <ErrorText>{errors.message}</ErrorText>}
    </div>
  );
}
