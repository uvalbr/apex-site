import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — The five systems that run your revenue operation",
  description:
    "Inbound answering, outbound revenue generation, appointment confirmation, CRM discipline, and KPI oversight — built as one connected backbone for U.S. construction companies.",
  openGraph: {
    title: "APEX Services — Five systems. One revenue operations backbone.",
    description:
      "Live inbound answering, outbound lead reactivation, no-show reduction, CRM ops, and KPI reporting for U.S. construction companies.",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
