export default function Loading({ name }: { name: string }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-14 h-14 rounded-full border-2 border-line border-t-brand spinner mb-8" />
      <p className="font-display uppercase text-xl mb-2">{name ? `Building your plan, ${name}…` : "Building your plan…"}</p>
      <p className="text-inksoft text-sm">Matching your answers to steps, tools and guides.</p>
    </section>
  );
}
