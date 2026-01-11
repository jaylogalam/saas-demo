/* -------------------------------------------------
--- Manually Sync Stripe Catalog to Supabase
--- (Useful for initial catalog sync)
------------------------------------------------- */

import "https://deno.land/std@0.168.0/dotenv/load.ts"; // Loads .env variables
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

/* ----------------------------------------------
--- Initialize Stripe
---------------------------------------------- */
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-10-16",
});

/* ----------------------------------------------
--- Initialize Supabase (Service Role)
---------------------------------------------- */
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") as string,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string,
);

/* ----------------------------------------------
--- Sync Catalog
---------------------------------------------- */
async function syncCatalog() {
  console.log("🚀 Starting Catalog Sync...");

  // 1. Fetch all products from Stripe
  const products = await stripe.products.list({
    limit: 100,
    active: true,
  });
  console.log(`Found ${products.data.length} products.`);

  for (const product of products.data) {
    const { error: pError } = await supabase.from("products").upsert({
      id: product.id,
      name: product.name,
      active: product.active,
      description: product.description,
      image: product.images?.[0] ?? null,
      metadata: product.metadata,
    });

    if (pError) console.error(`Error syncing product ${product.id}:`, pError);

    // 2. Fetch all prices for this product
    const prices = await stripe.prices.list({
      product: product.id,
      limit: 100,
    });

    for (const price of prices.data) {
      const { error: prError } = await supabase.from("prices").upsert({
        id: price.id,
        product_id: product.id,
        active: price.active,
        unit_amount: price.unit_amount,
        currency: price.currency,
        type: price.type,
        interval: price.recurring?.interval ?? null,
        interval_count: price.recurring?.interval_count ?? null,
        metadata: price.metadata,
      });

      if (prError) console.error(`Error syncing price ${price.id}:`, prError);
    }
  }
  console.log("✅ Sync Complete!");
}

syncCatalog();
