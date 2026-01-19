export const formatSubscriptionPrice = (price: number, currency?: string) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "usd",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};
