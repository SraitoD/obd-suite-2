import * as React from "react";
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({className="", ...props}: BtnProps) {
  const base = "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 active:bg-gray-100";
  return <button {...props} className={`${base} ${className}`} />;
}
