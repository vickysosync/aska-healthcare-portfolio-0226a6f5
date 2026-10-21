import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { GallerySection } from "@/components/site/Sections";
import { useSite } from "@/data/content";

const TITLE = "Gallery | ASKA Healthcare Private Limited";
const DESC = "Healthcare in Focus — representative imagery of healthcare and pharmaceutical environments.";

export const Route = createFileRoute("/gallery")({
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
  component: GalleryPage,
});

function GalleryPage() {
  const [site] = useSite();
  const s = site.sections;
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-surface focus:p-3">Skip to content</a>
      <Header />
      <main id="main">
        {s.gallery && <GallerySection />}
      </main>
      <Footer />
    </>
  );
}
