import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import ErrorText from "../Errors/ErrorText";

interface Props {
    inputType?: HTMLInputTypeAttribute;
    register: UseFormRegisterReturn;
    errors: FieldError | undefined;
    placeholder: string;
}

const InputLoginText = ({ register, errors, inputType = "text", placeholder }: Props) => {

    return (
        <div className="mb-5 pb-2">
          <input
              type={inputType}
              placeholder={placeholder}
              {...register}
              className="w-full px-6 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-lg focus:outline-none focus:border-green-500 focus:bg-white"

          />
          {errors && <ErrorText>{errors.message}</ErrorText>}
        </div>
    );
}


export default InputLoginText;