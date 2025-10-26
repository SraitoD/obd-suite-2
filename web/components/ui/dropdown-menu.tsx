import * as React from "react";

export function DropdownMenu(props:{children:React.ReactNode}) {
  return <div>{props.children}</div>;
}
export function DropdownMenuTrigger(props:{children:React.ReactNode}) {
  return <div>{props.children}</div>;
}
export function DropdownMenuContent(props:{children:React.ReactNode}) {
  return <div className="absolute right-4 mt-2 w-40 rounded-md border bg-white p-2 shadow">{props.children}</div>;
}
export function DropdownMenuItem(props:{children:React.ReactNode}) {
  return <div className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">{props.children}</div>;
}
