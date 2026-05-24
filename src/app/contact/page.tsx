import type { Metadata } from "next";
import { ContactHero } from "@/components/contact-page/ContactHero";
import { ContactMethods } from "@/components/contact-page/ContactMethods";
import { DiagnosticForm } from "@/components/contact-page/DiagnosticForm";
import { OfficeInfo } from "@/components/contact-page/OfficeInfo";
import { ContactFaq } from "@/components/contact-page/ContactFaq";

export const metadata: Metadata = {
  title: "Contact — Book a diagnostic call",
  description:
    "Book a 30-minute diagnostic call with APEX Revenue Operations. We respond within one business hour during EST operating hours. No pitch decks. Free audit of your funnel.",
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
