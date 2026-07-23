import type { Metadata } from 'next';
import { Mail, MapPin, Clock, Facebook, Linkedin, Twitter, Youtube, Briefcase, Stethoscope, Globe2, Users, LifeBuoy, Navigation } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { Container, SectionHeading, Eyebrow } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/motion';
import { site } from '@/content/site';
import { faqs } from '@/content/company';
import { buildMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Loremed Pharma — sales, medical information, export, HR and support. We’d love to hear from you.',
  path: '/contact',
});

const departments = [
  { icon: Briefcase, name: 'Sales', body: 'Orders, pricing and product availability for pharmacies and retailers.', email: 'sales@loremedpharma.com' },
  { icon: Stethoscope, name: 'Medical Information', body: 'Product dossiers and scientific information for healthcare professionals.', email: 'medical@loremedpharma.com' },
  { icon: Globe2, name: 'Export', body: 'Distribution and registration partnerships across the Middle East and Africa.', email: 'export@loremedpharma.com' },
  { icon: Users, name: 'Human Resources', body: 'Careers, applications and joining the Loremed team.', email: 'careers@loremedpharma.com' },
  { icon: LifeBuoy, name: 'Support', body: 'General enquiries and help with anything else.', email: 'info@loremedpharma.com' },
];

const socials = [
  { icon: Facebook, href: site.social.facebook, label: 'Facebook' },
  { icon: Linkedin, href: site.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: site.social.twitter, label: 'Twitter / X' },
  { icon: Youtube, href: site.social.youtube, label: 'YouTube' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Contact', url: '/contact' }])} />
      <PageHero
        eyebrow="Contact"
        title={<>Let&rsquo;s <span className="text-gradient">talk</span></>}
        lead="Whether you’re a distributor, a healthcare professional or simply curious about our products, our team is ready to help."
        crumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      {/* Form + channels */}
      <section className="section pt-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Channels */}
            <div>
              <Reveal>
                <Eyebrow>Reach us directly</Eyebrow>
                <h2 className="mt-4 text-display-sm sm:text-display-md">We’re here to help</h2>
              </Reveal>
              <div className="mt-8 space-y-4">
                <ChannelRow icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
                <ChannelRow icon={MapPin} label="Location" value={`${site.city}, ${site.country}`} />
                <ChannelRow icon={Clock} label="Hours" value="Sunday – Thursday · 9:00 – 17:00" />
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-ink-muted">Follow Loremed</p>
                <div className="mt-3 flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800"
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Departments */}
      <section id="departments" className="section bg-surface-muted">
        <Container>
          <SectionHeading
            eyebrow="Departments"
            title="Reach the right team"
            lead="Direct your enquiry to the department that can help you fastest."
            align="center"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.name} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-800 group-hover:text-white">
                    <d.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{d.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{d.body}</p>
                  <a
                    href={`mailto:${d.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-secondary-600"
                  >
                    <Mail className="h-4 w-4" />
                    {d.email}
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Map / location */}
      <section className="section">
        <Container>
          <div className="grid items-stretch gap-6 overflow-hidden rounded-4xl border border-line shadow-glow lg:grid-cols-2">
            {/* details */}
            <div className="flex flex-col justify-center gap-6 bg-primary-900 p-10 text-white sm:p-14">
              <Eyebrow variant="inverse">Find us</Eyebrow>
              <h2 className="text-display-sm text-white sm:text-display-md">Based in Cairo, serving the region</h2>
              <p className="text-white/60">
                Loremed Pharma is proudly headquartered in {site.city}, {site.country} — with partnerships
                reaching across the Middle East and Africa.
              </p>
              <div className="flex items-center gap-3 text-white/80">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-medium text-white">{site.city}, {site.country}</div>
                  <div className="text-sm text-white/50">{site.address.region}</div>
                </div>
              </div>
            </div>

            {/* branded map panel */}
            <div className="relative min-h-[22rem] overflow-hidden bg-primary-50">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
              <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden fill="none">
                <path d="M-20 120 C120 90 180 200 340 150 S520 120 540 180" stroke="#B9A9DB" strokeWidth="2" fill="none" />
                <path d="M-20 240 C140 210 220 300 360 250 S520 240 540 300" stroke="#B9A9DB" strokeWidth="2" fill="none" />
                <path d="M120 -20 C150 120 90 220 160 360" stroke="#D8CFEC" strokeWidth="2" fill="none" />
                <path d="M330 -20 C360 140 300 240 380 420" stroke="#D8CFEC" strokeWidth="2" fill="none" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative flex flex-col items-center">
                  <span className="absolute -inset-6 animate-breathe rounded-full bg-secondary-500/20 blur-xl" />
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary-500 text-white shadow-glow-orange">
                    <MapPin className="h-8 w-8" />
                  </span>
                  <span className="mt-4 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-primary-800 shadow-card">
                    {site.city}, {site.country}
                  </span>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Cairo%2C+Egypt"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 end-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-primary-800 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <Navigation className="h-4 w-4 text-secondary-500" />
                Get directions
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section bg-surface-muted pt-0 sm:pt-0">
        <div className="pt-20 sm:pt-24">
          <Container size="narrow">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12">
              <Accordion items={faqs} />
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}

function ChannelRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition-colors hover:border-primary-200">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</div>
        <div className="font-medium text-ink">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
