import {FieldError, UseFormRegisterReturn} from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  label: string;
}

export default function InputEditForm({register, errors, label}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        {...register}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
    </div>
  )
}