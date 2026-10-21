import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero, WhySection } from "@/components/site/Sections";
import { useSite } from "@/data/content";

const TITLE = "ASKA Healthcare Private Limited | Healthcare & Pharmaceutical Portfolio";
const DESC = "ASKA Healthcare Private Limited, Mumbai — human healthcare activities, pharmaceutical products portfolio, and hospital-related activities.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [site] = useSite();
  const s = site.sections;
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-surface focus:p-3">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        {s.why && <WhySection />}
      </main>
      <Footer />
    </>
  );
}
