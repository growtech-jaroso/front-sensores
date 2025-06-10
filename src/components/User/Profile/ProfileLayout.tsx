import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function ProfileLayout({ children, title, className = "" }: Props) {
  return (
    <div className="h-full bg-gray-100 flex justify-center items-start">
      <section className={`w-full max-w-4xl py-8 px-4 ${className}`}>
        {title && (
          <header>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
          </header>
        )}
        {children}
      </section>
    </div>
  );
}
