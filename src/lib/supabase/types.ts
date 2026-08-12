/**
 * Database type definitions untuk Supabase.
 * Sesuai skema yang dibuat oleh bot:
 *   - public_status_snapshot  → agregat global bot (guild count, members, ping)
 *   - bot_servers             → semua server tempat bot diundang (auto-sync, tanpa opt-in)
 */
export interface Database {
  public: {
    Tables: {
      public_status_snapshot: {
        Row: PublicStatusSnapshot;
        Insert: never; // web tidak punya akses insert
        Update: never;
      };
      bot_servers: {
        Row: BotServer;
        Insert: never;
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export interface PublicStatusSnapshot {
  id: number;
  guild_count: number;
  total_members: number;
  ping_ms: number | null;
  started_at: string | null; // timestamptz ISO string
  updated_at: string;
  bot_version?: string | null;
}

export interface BotServer {
  guild_id: string;
  guild_name: string;
  member_count: number;
  human_count: number;
  bot_count: number;
  owner_id: string | null;
  icon_url: string | null;
  banner_url: string | null;
  features: string[];           // e.g. ["COMMUNITY", "VERIFIED", "PARTNERED"]
  preferred_locale: string;     // e.g. "en-US", "id"
  boost_level: number;          // 0 | 1 | 2 | 3
  boost_count: number;
  first_seen_at: string;        // timestamptz ISO string
  updated_at: string;
}
