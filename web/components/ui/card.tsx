import * as React from "react";
export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`rounded-xl border p-4 ${props.className||""}`} />;
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`mb-2 ${props.className||""}`} />;
}
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className={`text-xl font-semibold ${props.className||""}`} />;
}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`${props.className||""}`} />;
}
