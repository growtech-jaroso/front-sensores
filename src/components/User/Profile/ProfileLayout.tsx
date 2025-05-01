import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function ProfileLayout({
  children,
  title,
  className = "",
}: Props) {
  return (
    <section className={`max-w-3xl mx-auto py-10 px-4 space-y-10 ${className}`}>
      {title && (
        <header>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
        </header>
      )}
      {children}
    </section>
  );
}
