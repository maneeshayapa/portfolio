export default function GitaourenPage() {
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com";
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com";
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com";

  return (
    <main className="min-h-screen bg-[#060E1F] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Gitaouren</h1>
        <p className="text-fog mb-8">This page was created as requested. Here are the social profiles linked from the .env file.</p>
        <div className="grid gap-4">
          <a href={linkedin} target="_blank" rel="noreferrer noopener" className="block rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">
            LinkedIn: {linkedin}
          </a>
          <a href={github} target="_blank" rel="noreferrer noopener" className="block rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">
            GitHub: {github}
          </a>
          <a href={facebook} target="_blank" rel="noreferrer noopener" className="block rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">
            Facebook: {facebook}
          </a>
        </div>
      </div>
    </main>
  );
}
