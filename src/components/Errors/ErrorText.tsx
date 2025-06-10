import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorText = ({ children }: Props) => {
  return <p className="text-red-500 text-sm mt-1">{children}</p>;
};

export default ErrorText;
