import * as React from "react";

type TabsProps = { defaultValue?: string; children: React.ReactNode };
type TabTriggerProps = { value: string; children: React.ReactNode; onSelect?: (v:string)=>void };
type TabContentProps = { value: string; children: React.ReactNode };

const Ctx = React.createContext<{value:string,setValue:(v:string)=>void} | null>(null);

export function Tabs({ defaultValue="", children }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);
  return <Ctx.Provider value={{value,setValue}}><div>{children}</div></Ctx.Provider>;
}
export function TabsList({ children }:{children:React.ReactNode}) {
  return <div className="mb-3 flex gap-2 border-b pb-2">{children}</div>;
}
export function TabsTrigger({ value, children }: TabTriggerProps) {
  const ctx = React.useContext(Ctx)!;
  const active = ctx.value === value;
  return (
    <button
      onClick={()=>ctx.setValue(value)}
      className={`rounded px-3 py-1 text-sm ${active ? "bg-black text-white" : "bg-gray-100"}`}
    >
      {children}
    </button>
  );
}
export function TabsContent({ value, children }: TabContentProps) {
  const ctx = React.useContext(Ctx)!;
  if (ctx.value !== value) return null;
  return <div>{children}</div>;
}
