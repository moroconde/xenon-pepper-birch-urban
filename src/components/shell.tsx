import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function BrandMark({ className, variant = "color" }: { className?: string; variant?: "color" | "white" }) {
  return (
    <img
      src={variant === "white" ? "/brand/logo-blanco.png" : "/brand/logo.png"}
      alt="Miriam Eguía Nutrición"
      crossOrigin="anonymous"
      className={cn("brand-lockup", className)}
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link
          to="/"
          aria-label="Miriam Eguía Nutrición — inicio"
          className="inline-flex shrink-0 items-center"
        >
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors duration-150",
                  active
                    ? "bg-sage text-cream"
                    : "text-ink-soft hover:bg-paper-deep hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-1.5 pr-2 text-sm text-muted md:inline-flex"
          >
            <Phone className="size-3.5" />
            {site.phone}
          </a>
          <Button asChild size="sm">
            <Link to="/contacto">Reservar cita</Link>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-cream text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-cream px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-ink hover:bg-paper-deep"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link to="/contacto" onClick={() => setOpen(false)}>
                Reservar cita
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-cream/20 text-cream/85 transition-colors hover:border-cream/50 hover:bg-cream/10 hover:text-cream"
    >
      {children}
    </a>
  );
}

function SocialLinks() {
  return (
    <nav className="mt-5 flex flex-wrap gap-2" aria-label="Redes sociales">
      <SocialIcon href={site.social.facebook} label="Facebook">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"
          />
        </svg>
      </SocialIcon>
      <SocialIcon href={site.social.x} label="X">
        <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </SocialIcon>
      <SocialIcon href={site.social.instagram} label="Instagram">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      </SocialIcon>
      <SocialIcon href={site.social.youtube} label="YouTube">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M23 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C17.6 4.8 12 4.8 12 4.8s-5.6 0-8.2.3c-.4.1-1.2.1-2 .9C1.2 6.6 1 8 1 8S.8 9.6.8 11.2v1.5c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.8.8 1.8.8 2.3.9 1.7.2 8.9.2 8.9.2s5.6 0 8.2-.3c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.5C23.2 9.6 23 8 23 8zM9.8 14.6V9.2l5.6 2.7-5.6 2.7z"
          />
        </svg>
      </SocialIcon>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="no-print border-t border-line bg-sage-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <BrandMark className="is-footer" variant="white" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">
            {site.doctor}. {site.profession}. Atención presencial en Santander.
          </p>
          <SocialLinks />
        </div>
        <div className="text-sm leading-relaxed text-cream/80">
          <p className="font-medium uppercase tracking-[0.16em] text-cream/55">
            Consulta
          </p>
          <p className="mt-3">{site.address}</p>
          <p>{site.city}</p>
          <p className="mt-3">
            <a className="hover:text-cream" href={site.phoneHref}>
              {site.phone}
            </a>
          </p>
          <p>
            <a className="hover:text-cream" href={site.emailHref}>
              {site.email}
            </a>
          </p>
        </div>
        <div className="text-sm leading-relaxed text-cream/80">
          <p className="font-medium uppercase tracking-[0.16em] text-cream/55">
            Centro sanitario
          </p>
          <p className="mt-3">
            Centro registrado Nº {site.centroRegistro}. Autorización de centros,
            servicios y establecimientos sanitarios de Cantabria.
          </p>
          <p className="mt-3">
            Director técnico responsable: {site.director}
          </p>
          <p className="mt-1">
            {site.colegio}. Identificación profesional en el{" "}
            <Link to="/aviso-legal" className="underline decoration-cream/30 hover:text-cream">
              aviso legal
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} miriameguianutricion.com</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/aviso-legal" className="hover:text-cream">
              Aviso legal
            </Link>
            <Link to="/contacto" className="hover:text-cream">
              Cita previa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
