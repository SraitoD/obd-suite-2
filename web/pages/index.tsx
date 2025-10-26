import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  return (
    <main style={{ padding: 24 }}>
      {session ? (
        <>
          <h1>Bienvenue {session.user?.email}</h1>
          <p>Vous êtes connecté.</p>
        </>
      ) : (
        <>
          <h1>Bienvenue</h1>
          <p>Vous n'êtes pas connecté.</p>
        </>
      )}
    </main>
  );
}

// Empêche le pré-rendu statique (SSG) qui casse useSession côté serveur
export async function getServerSideProps() {
  return { props: {} };
}
