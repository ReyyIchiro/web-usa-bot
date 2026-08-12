import type { Metadata } from "next";
import { brand } from "../../../brand.config";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import StatusPageClient from "@/components/status/StatusPageClient";
import { supabase } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Status Bot",
  description: `Status real-time ${brand.name}: uptime, latency, total server, total member, dan daftar server komunitas yang opt-in.`,
};

// Status page selalu fresh - realtime data dari Supabase, tidak di-cache
export const dynamic = "force-dynamic";

export default async function StatusPage() {
  // Fetch initial data via Server Component (0ms loading for user, perfect SEO)
  const [{ data: snap }, { data: serverData }] = await Promise.all([
    supabase.from("public_status_snapshot").select("*").eq("id", 1).single(),
    supabase.from("bot_servers").select("*").order("member_count", { ascending: false }),
  ]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
        <StatusPageClient 
          initialSnapshot={snap} 
          initialServers={serverData || []} 
        />
      </main>
      <Footer />
    </>
  );
}
