import LinkList from "./components/LinkList";
import AuthButton from "./components/AuthButton";

async function getLinks() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/links`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch links");
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching links:", error);
    return [];
  }
}

export default async function Home() {
  const initialLinks = await getLinks();

  return (
    <main className="min-h-screen px-5 py-16 md:px-8 md:py-24">
      {/* Auth button - fixed top-right, subtle */}
      <div className="fixed right-5 top-5 z-40 animate-fade-in md:right-8 md:top-8">
        <AuthButton />
      </div>

      <section className="mx-auto flex max-w-xl flex-col items-center gap-12">
        {/* Profile Header - Centered bio card */}
        <header className="flex w-full flex-col items-center gap-5 text-center animate-fade-in">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-accent/70 text-3xl font-bold text-white">
              OP
            </div>
            {/* Online indicator dot */}
            <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-mist bg-emerald-400" />
          </div>

          {/* Name and bio */}
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
              Opyjo
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-slate md:text-base">
              A curated list of apps, experiments, and client work.
              Pick a project and explore.
            </p>
          </div>
        </header>

        {/* Links Section */}
        <div
          className="w-full opacity-0 animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          <LinkList initialLinks={initialLinks} />
        </div>

        {/* Footer - minimal */}
        <footer
          className="opacity-0 animate-fade-in text-center text-xs text-slate/60"
          style={{ animationDelay: "400ms" }}
        >
          <span>Built with Next.js + Tailwind + Firebase</span>
        </footer>
      </section>
    </main>
  );
}
