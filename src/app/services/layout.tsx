import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — The five systems that run your revenue operation",
  description:
    "Inbound answering, outbound revenue generation, appointment confirmation, CRM discipline, and KPI oversight — one connected revenue ops backbone.",
  keywords: [
    "outsourced inbound call answering construction",
    "appointment confirmation service contractors",
    "outbound lead reactivation HVAC roofing",
    "construction CRM management",
    "revenue operations services construction",
  ],
  alternates: { canonical: "https://apex.texasserviceexperts.com/services" },
  openGraph: {
    type: "website",
    title: "APEX Services — Five systems. One revenue operations backbone.",
    description:
      "Live inbound answering, outbound lead reactivation, no-show reduction, CRM ops, and KPI reporting for U.S. construction companies.",
    url: "https://apex.texasserviceexperts.com/services",
    siteName: "APEX Revenue Operations",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
