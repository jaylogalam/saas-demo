// Supabase Database Types
// These types match your Supabase products and prices tables

export interface SupabaseProduct {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  image: string | null;
  metadata: {
    features?: string;
    highlighted?: string;
    payment_link_monthly?: string;
    payment_link_yearly?: string;
  } | null;
}

export interface SupabasePrice {
  id: string;
  product_id: string;
  active: boolean;
  unit_amount: number;
  currency: string;
  type: string;
  interval: "month" | "year" | null;
  interval_count: number | null;
  metadata: Record<string, string> | null;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: SupabaseProduct;
      };
      prices: {
        Row: SupabasePrice;
      };
    };
  };
}
