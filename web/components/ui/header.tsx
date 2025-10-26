import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-base font-semibold">OBD Suite</Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dtc">DTC</Link>
          <Link href="/live">Live</Link>
          <Link href="/history">Historique</Link>
          <Link href="/account">Compte</Link>
        </nav>
      </div>
    </header>
  );
}
