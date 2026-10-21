import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Emblem, Icon } from "@/components/ui-kit";
import { useSite, type SectionKey } from "@/data/content";

const NAV: { to: string; label: string; key?: SectionKey }[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us", key: "about" },
  { to: "/services", label: "Healthcare Services", key: "services" },
  { to: "/products", label: "Pharmaceutical Products", key: "products" },
  { to: "/hospital-activities", label: "Hospital Activities", key: "hospital" },
  { to: "/approach", label: "Our Approach", key: "approach" },
  { to: "/contact", label: "Contact Us", key: "contact" },
];

export function Header() {
  const [site] = useSite();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathname = location?.pathname ?? "/";

  const items = NAV.filter((n) => !n.key || site.sections[n.key]);

  const isItemActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const link = (active: boolean) =>
    `rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
      active ? "text-secondary font-semibold" : "text-primary hover:text-secondary"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-surface/95 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label="ASKA Healthcare home">
          <Emblem />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-primary">ASKA HEALTHCARE</span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">{site.tagline}</span>
          </span>
        </Link>
        <nav className="hidden items-center xl:flex" aria-label="Main">
          {items.map((n) => {
            const active = isItemActive(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={link(active)}
                aria-current={active ? "page" : undefined}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn btn-teal hidden sm:inline-flex">
            Get in Touch
          </Link>
          <button
            className="rounded-md p-2 text-primary xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t bg-surface xl:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-3">
            {items.map((n) => {
              const active = isItemActive(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`${link(active)} border-b border-border/60 py-3 last:border-0`}
                  aria-current={active ? "page" : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-teal mt-3">
              Get in Touch
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
