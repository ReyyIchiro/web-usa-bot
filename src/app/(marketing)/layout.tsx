import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { PageTransition } from "@/components/ui/PageTransition";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "60px" }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
