import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-10">{children}</div>
  );
}
