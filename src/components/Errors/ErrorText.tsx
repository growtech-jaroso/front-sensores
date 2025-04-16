import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ErrorText =  ({children}: Props) => {
    return (
        <p className="text-red-500 font-semibold">{children}</p>
    );
}

export default ErrorText;