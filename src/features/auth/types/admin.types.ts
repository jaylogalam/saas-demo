export type Admin = boolean;
export type AdminUserView = {
    user_id: string;
    email: string;
    full_name: string | null;
    joined_at: string;
    customer_id: string | null;
    subscription_id: string | null;
    subscription_status: string | null;
    product_name: string | null;
    billing_interval: string | null;
    current_period_start: number | null;
    current_period_end: number | null;
    cancel_at_period_end: boolean | null;
};
