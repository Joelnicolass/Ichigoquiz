import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CharacterId } from "./data";

let client: SupabaseClient | null = null;

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, { auth: { persistSession: false } });
  return client;
}

/** Guarda el resultado y devuelve el % de jugadores que obtuvieron el mismo personaje. */
export async function saveAndGetShare(id: CharacterId): Promise<{ percent: number; total: number } | null> {
  const sb = getClient();
  if (!sb) return null;
  try {
    await sb.from("results").insert({ character_id: id });
    const { data, error } = await sb.rpc("character_stats");
    if (error || !data) return null;
    const rows = data as { character_id: string; total: number }[];
    const total = rows.reduce((acc, r) => acc + Number(r.total), 0);
    const mine = Number(rows.find((r) => r.character_id === id)?.total ?? 0);
    return { percent: total ? Math.round((mine / total) * 100) : 0, total };
  } catch {
    return null;
  }
}
