import type { Metadata } from "next";
import { ContactHero } from "@/components/contact-page/ContactHero";
import { ContactMethods } from "@/components/contact-page/ContactMethods";
import { DiagnosticForm } from "@/components/contact-page/DiagnosticForm";
import { OfficeInfo } from "@/components/contact-page/OfficeInfo";
import { ContactFaq } from "@/components/contact-page/ContactFaq";

export const metadata: Metadata = {
  title: "Contact — Book a diagnostic call",
  description:
    "Book a 30-minute revenue ops diagnostic with APEX. One-business-hour response on EST. Free audit of your funnel. No pitch decks.",
  keywords: [
    "revenue operations diagnostic call",
    "construction sales audit",
    "book sales operations consultation",
    "contact APEX Revenue Operations",
  ],
  alternates: { canonical: "https://apexrevenueoperations.com/contact" },
  openGraph: {
    type: "website",
    title: "Contact APEX Revenue Operations",
    description:
      "Book a 30-minute diagnostic call. Free audit of your funnel. One-business-hour response on EST.",
    url: "https://apexrevenueoperations.com/contact",
    siteName: "APEX Revenue Operations",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMethods />
      <DiagnosticForm />
      <OfficeInfo />
      <ContactFaq />
    </>
  );
}
