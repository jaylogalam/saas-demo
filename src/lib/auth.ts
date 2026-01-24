// Auth state change listener
// Invalidates the user query when auth state changes
import { supabase } from "@/lib/supabase";
import { queryClient } from "@/lib/queryClient";
import { queryKeys } from "@/lib/queryKeys";

supabase.auth.onAuthStateChange((event) => {
  // console.log("event", event);
  // console.log("session", session);

  if (event === "SIGNED_OUT") {
    // clear local and session storage
    [
      window.localStorage,
      window.sessionStorage,
    ].forEach((storage) => {
      Object.entries(storage)
        .forEach(([key]) => {
          storage.removeItem(key);
        });
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
  } else {
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
  }
});
