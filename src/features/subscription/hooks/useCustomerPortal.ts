/**
 * Open Stripe Customer Portal
 */
export function useCustomerPortal() {
    const openPortal = () => {
        const portalUrl = "https://billing.stripe.com/p/login/test_XXXXXX";

        if (portalUrl.includes("XXXX")) {
            alert(
                "Subscription management is not configured yet. Please contact support.",
            );
            return;
        }

        window.open(portalUrl, "_blank");
    };

    return { openPortal };
}
