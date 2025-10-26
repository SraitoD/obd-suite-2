import * as React from "react";
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export function Input({className="", ...props}: Props) {
  const base="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring";
  return <input {...props} className={`${base} ${className}`} />;
}
