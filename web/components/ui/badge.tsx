import * as React from "react";
export function Badge({children, className=""}:{children:React.ReactNode,className?:string}) {
  return <span className={`inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium ${className}`}>{children}</span>;
}
