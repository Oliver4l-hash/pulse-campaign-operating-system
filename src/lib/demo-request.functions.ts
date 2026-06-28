import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  organization: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  stage: z.string().min(1).max(60),
  message: z.string().trim().min(10).max(1000),
});

export const submitDemoRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend not configured");

    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from("demo_requests" as never).insert({
      name: data.name,
      email: data.email,
      organization: data.organization,
      role: data.role || null,
      stage: data.stage,
      message: data.message,
    } as never);

    if (error) {
      console.error("[demo_requests] insert failed:", error.message);
      throw new Error("We couldn't record your request. Please try again.");
    }
    return { ok: true as const };
  });
