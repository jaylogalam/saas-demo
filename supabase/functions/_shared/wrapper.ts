// supabase/functions/_shared/wrapper.ts
import { corsHeaders } from "./cors.ts";

/**
 * withMiddleware is a "Higher Order Function".
 * It takes your business logic and wraps it with CORS and Error handling.
 */
export const withMiddleware = (handler: (req: Request) => Promise<Response>) => {
  return async (req: Request): Promise<Response> => {
    // 1. Handle the browser's CORS Preflight (OPTIONS)
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    try {
      // 2. Run your actual function logic
      const response = await handler(req);

      // 3. Clone the response to inject CORS headers into the final output
      const newHeaders = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        newHeaders.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    } catch (err) {
      // 4. Global Error Catching
      console.error("Edge Function Error:", err);

      return new Response(
        JSON.stringify({
          error: err instanceof Error ? err.message : "Internal Server Error",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
  };
};
