import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useUserStore } from "@/store/userStore";
import type {
    BillingInterval,
    SubscriptionPlan,
} from "@/types/subscription.types";

/**
 * Handle checkout redirect to Stripe Payment Link
 */
export function useCheckout() {
    const { user } = useUserStore();
    const { billingInterval } = useSubscriptionStore();

    const checkout = (plan: SubscriptionPlan, interval?: BillingInterval) => {
        const selectedInterval = interval ?? billingInterval;
        const paymentLink = plan.paymentLinks[selectedInterval];

        if (
            !paymentLink || paymentLink.includes("XXXX") || paymentLink === ""
        ) {
            alert("Payment is not configured yet. Please contact support.");
            return;
        }

        const url = new URL(paymentLink);
        if (user?.id) url.searchParams.set("client_reference_id", user.id);
        if (user?.email) url.searchParams.set("prefilled_email", user.email);

        window.open(url.toString(), "_blank");
    };

    return { checkout };
}
