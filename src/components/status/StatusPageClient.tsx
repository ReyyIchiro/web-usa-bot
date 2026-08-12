"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase/client";
import type { PublicStatusSnapshot, BotServer } from "@/lib/supabase/types";
import Image from "next/image";
import { Server, Users, Activity, Clock, Wifi, Cpu, Bot, Search, ChevronDown } from "lucide-react";
import { brand } from "../../../brand.config";


// ─── Utilities ───────────────────────────────────────────────────────────────

function formatNumber(n: number | null | undefined): string {
  if (n == null) return "-";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("id-ID");
}

function getUptime(startedAt: string | null | undefined): string {
  if (!startedAt) return "-";
  const ms = Date.now() - new Date(startedAt).getTime();
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (d > 0) return `${d}h ${h}j`;
  if (h > 0) return `${h}j ${m}m`;
  return `${m}m`;
}

function getLastUpdated(updatedAt: string | null | undefined): string {
  if (!updatedAt) return "-";
  const diff = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 1000);
  if (diff < 60) return `${diff}d lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`;
  return `${Math.floor(diff / 3600)}j lalu`;
}

function getLocaleFlag(locale: string): string {
  const map: Record<string, string> = {
    "id": "🇮🇩", "en-US": "🇺🇸", "en-GB": "🇬🇧",
    "ja": "🇯🇵", "ko": "🇰🇷", "zh-CN": "🇨🇳",
    "zh-TW": "🇹🇼", "fr": "🇫🇷", "de": "🇩🇪",
    "pt-BR": "🇧🇷", "ru": "🇷🇺", "es-ES": "🇪🇸",
    "nl": "🇳🇱", "tr": "🇹🇷", "vi": "🇻🇳",
  };
  return map[locale] ?? "🌐";
}

function getBoostBadge(level: number): { label: string; color: string; bg: string } | null {
  if (level === 1) return { label: "Boost I",   color: "#f472b6", bg: "rgba(244,114,182,.12)" };
  if (level === 2) return { label: "Boost II",  color: "#a855f7", bg: "rgba(168,85,247,.12)"  };
  if (level === 3) return { label: "Boost III", color: "#d4af37", bg: "rgba(212,175,55,.12)"  };
  return null;
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

function StatusMetricCard({
  icon: Icon, label, value, color = "var(--accent)", mono = true, sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: string;
  mono?: boolean;
  sub?: string;
}) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "1rem",
      padding: "1.5rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Icon size={15} style={{ color: "var(--text-muted)" }} />
        <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.02em" }}>{label}</span>
      </div>
      <div style={{
        fontSize: "1.75rem",
        fontWeight: mono ? 800 : 900,
        letterSpacing: mono ? "-0.04em" : "-0.02em",
        fontFamily: mono ? "var(--font-geist-mono, var(--font-mono))" : "var(--font-inter, var(--font-sans))",
        color,
      }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.375rem" }}>{sub}</div>}
    </div>
  );
}

// ─── Server Card ─────────────────────────────────────────────────────────────

function ServerCard({ server, rank }: { server: BotServer; rank: number }) {
  const boost = getBoostBadge(server.boost_level);
  const isVerified   = server.features.includes("VERIFIED");
  const isPartnered  = server.features.includes("PARTNERED");
  const isCommunity  = server.features.includes("COMMUNITY");
  const flag = getLocaleFlag(server.preferred_locale);

  return (
    <div
      className="server-card card-glow"
      style={{
        background: "var(--surface)",
        border: `1px solid ${isPartnered ? "rgba(212,175,55,.3)" : isVerified ? "rgba(59,130,246,.2)" : "var(--border)"}`,
        borderRadius: "1rem",
        padding: "1.25rem",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      {/* Rank badge */}
      {rank <= 3 && (
        <div style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: rank === 1 ? "#d4af37" : rank === 2 ? "#9ca3af" : "#cd7f32",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.625rem",
          fontWeight: 800,
          color: "#000",
        }}>
          #{rank}
        </div>
      )}

      {/* Header: icon + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
        {server.icon_url ? (
          <Image
            src={server.icon_url}
            alt={server.guild_name}
            width={48}
            height={48}
            style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            unoptimized
          />
        ) : (
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "var(--surface-2)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-glow)",
            flexShrink: 0,
          }}>
            {server.guild_name.charAt(0).toUpperCase()}
          </div>
        )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "0.9375rem", fontWeight: 700,
              color: "var(--text-primary)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}>
            {server.guild_name}
          </div>
          {/* Feature badges */}
          <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.3rem", flexWrap: "wrap" }}>
            {isPartnered && (
              <span style={{ fontSize: "0.625rem", fontWeight: 700, padding: "0.1rem 0.4rem", borderRadius: "4px", background: "rgba(212,175,55,.15)", color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Partner
              </span>
            )}
            {isVerified && (
              <span style={{ fontSize: "0.625rem", fontWeight: 700, padding: "0.1rem 0.4rem", borderRadius: "4px", background: "rgba(59,130,246,.12)", color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Verified
              </span>
            )}
            {isCommunity && (
              <span style={{ fontSize: "0.6rem", padding: "0.125rem 0.4rem", borderRadius: "0.25rem", background: "var(--accent-glow)", color: "var(--accent)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                COMMUNITY
              </span>
            )}
            {boost && (
              <span style={{ fontSize: "0.625rem", fontWeight: 700, padding: "0.1rem 0.4rem", borderRadius: "4px", background: boost.bg, color: boost.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {boost.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <div style={{
          background: "var(--bg)", borderRadius: "0.625rem", padding: "0.625rem 0.75rem",
          border: "1px solid var(--border)",
        }}>
          <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
            <Users size={10} style={{ display: "inline", marginRight: "0.25rem" }} />
            Total Member
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
            {formatNumber(server.member_count)}
          </div>
        </div>

        <div style={{
          background: "var(--bg)", borderRadius: "0.625rem", padding: "0.625rem 0.75rem",
          border: "1px solid var(--border)",
        }}>
          <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
            <Bot size={10} style={{ display: "inline", marginRight: "0.25rem" }} />
            Manusia
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9375rem", color: "#22c55e" }}>
            {formatNumber(server.human_count)}
          </div>
        </div>

        {server.boost_count > 0 && (
          <div style={{
            background: "var(--bg)", borderRadius: "0.625rem", padding: "0.625rem 0.75rem",
            border: "1px solid var(--border)",
          }}>
            <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>✨ Booster</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9375rem", color: "#f472b6" }}>
              {server.boost_count}
            </div>
          </div>
        )}

        <div style={{
          background: "var(--bg)", borderRadius: "0.625rem", padding: "0.625rem 0.75rem",
          border: "1px solid var(--border)",
          gridColumn: server.boost_count > 0 ? undefined : "1 / 3",
        }}>
          <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>🌐 Bahasa</div>
          <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
            {flag} {server.preferred_locale}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type SortKey = "member_count" | "boost_level" | "first_seen_at";

export default function StatusPageClient({ 
  initialSnapshot, 
  initialServers 
}: { 
  initialSnapshot: any; 
  initialServers: any[]; 
}) {
  const [snapshot, setSnapshot] = useState<PublicStatusSnapshot | null>(initialSnapshot);
  const [servers, setServers]   = useState<BotServer[]>(initialServers);
  const [lastUpdated, setLastUpdated] = useState<string>("-");
  const [search, setSearch]     = useState("");
  const [sortBy, setSortBy]     = useState<SortKey>("member_count");

  useEffect(() => {
    let isMounted = true;
    async function fetchServers() {
      const { data } = await supabase.from("bot_servers").select("*").order("member_count", { ascending: false });
      if (data && isMounted) setServers(data as BotServer[]);
    }

    // Realtime: snapshot update
    const channel = supabase
      .channel("public_status_realtime")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "public_status_snapshot" },
        (payload) => setSnapshot(payload.new as PublicStatusSnapshot)
      )
      .on("postgres_changes", { event: "*", schema: "public", table: "bot_servers" },
        () => fetchServers() // Re-fetch on any change to bot_servers
      )
      .subscribe();

    return () => { 
      isMounted = false;
      supabase.removeChannel(channel); 
    };
  }, []);

  useEffect(() => {
    if (!snapshot?.updated_at) return;
    const update = () => setLastUpdated(getLastUpdated(snapshot?.updated_at));
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, [snapshot?.updated_at]);

  const isOnline  = snapshot != null;
  const pingMs    = snapshot?.ping_ms;
  const pingColor = pingMs == null ? "var(--text-muted)" : pingMs < 100 ? "#22c55e" : pingMs < 250 ? "#f97316" : "#ef4444";

  // Filter + sort
  const filteredServers = useMemo(() => {
    let list = [...servers];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s => s.guild_name.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortBy === "member_count") return b.member_count - a.member_count;
      if (sortBy === "boost_level")  return b.boost_level - a.boost_level || b.boost_count - a.boost_count;
      if (sortBy === "first_seen_at") return new Date(a.first_seen_at).getTime() - new Date(b.first_seen_at).getTime();
      return 0;
    });
    return list;
  }, [servers, search, sortBy]);

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section style={{ padding: "3.5rem 1.5rem 2rem", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="grid-bg" />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem" }}>
            <span className="status-dot" style={{
              background: isOnline ? "#22c55e" : "#ef4444",
              boxShadow: isOnline ? "0 0 6px rgba(34,197,94,0.6)" : "0 0 6px rgba(239,68,68,0.6)",
              animation: isOnline ? "pulse-green 2s ease-in-out infinite" : "none",
            }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: isOnline ? "#22c55e" : "#ef4444" }}>
              {isOnline ? "Semua sistem normal" : "Data tidak tersedia"}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
            Status <span className="gradient-text">USA Core</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
            Data realtime - diperbarui otomatis setiap 1 Jam.
            {snapshot && (
              <> Terakhir update: <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{lastUpdated}</span></>
            )}
          </p>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────── */}
      <section style={{ padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            <StatusMetricCard icon={Server}   label="Total Server"  value={formatNumber(snapshot?.guild_count)} />
            <StatusMetricCard icon={Users}    label="Total Member"  value={formatNumber(snapshot?.total_members)} />
            <StatusMetricCard icon={Wifi}     label="Latency"       value={pingMs != null ? `${pingMs}ms` : "-"} color={pingColor} />
            <StatusMetricCard icon={Clock}    label="Uptime"        value={getUptime(snapshot?.started_at)} color="var(--text-primary)" mono={false} />
            <StatusMetricCard icon={Activity} label="Versi Bot"     value={snapshot?.bot_version ?? "v3.2.0"} color="var(--accent)" />
            <StatusMetricCard icon={Cpu}      label="API Discord"   value={isOnline ? "Online" : "Offline"} color={isOnline ? "#22c55e" : "#ef4444"} mono={false} />
          </div>

          {/* Offline notice */}
          {!snapshot && (
            <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", borderRadius: "0.875rem", padding: "1.25rem", marginBottom: "2rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              <strong style={{ color: "#ef4444" }}>Data status tidak tersedia.</strong>{" "}
              Bot mungkin sedang restart atau tabel <code>public_status_snapshot</code> belum dikonfigurasi.{" "}
              <a href={brand.supportServerUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>Discord Support</a>.
            </div>
          )}

          {/* ── Server Directory ─────────────────────────────────────── */}
          <div>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h2 style={{ fontSize: "1.3125rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                  Server Directory
                </h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                  {servers.length} server aktif menggunakan USA Core
                </p>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                {/* Search */}
                <div style={{ position: "relative" }}>
                  <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input
                    type="text"
                    placeholder="Cari server..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 0.75rem 0.5rem 2.125rem",
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                      outline: "none",
                      width: "180px",
                    }}
                  />
                </div>

                {/* Sort */}
                <div style={{ position: "relative" }}>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortKey)}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 2rem 0.5rem 0.75rem",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="member_count">Member terbanyak</option>
                    <option value="boost_level">Boost tertinggi</option>
                    <option value="first_seen_at">Terlama bergabung</option>
                  </select>
                  <ChevronDown size={13} style={{ position: "absolute", right: "0.625rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredServers.length === 0 ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", background: "var(--surface)", borderRadius: "1.25rem", border: "1px solid var(--border)" }}>
                <Server size={36} style={{ color: "var(--text-muted)", margin: "0 auto 1rem", display: "block" }} />
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", fontWeight: 600 }}>
                  {search ? `Tidak ada server yang cocok dengan "${search}"` : "Belum ada server yang terdaftar."}
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                  {filteredServers.map((server, i) => (
                    <ServerCard key={server.guild_id} server={server} rank={i + 1} />
                  ))}
                </div>
                <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "var(--text-muted)", textAlign: "center" }}>
                  Menampilkan {filteredServers.length} dari {servers.length} server
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .skeleton { animation: skeleton-pulse 1.5s ease-in-out infinite; }
        @keyframes skeleton-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.3; } }
        input:focus { border-color: var(--accent) !important; }
        select:hover { border-color: var(--accent) !important; color: var(--text-primary) !important; }
      `}</style>
    </div>
  );
}
