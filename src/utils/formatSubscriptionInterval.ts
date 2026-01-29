export const formatSubscriptionInterval = (interval: string) => {
    switch (interval) {
        case "month":
            return "monthly";
        case "year":
            return "yearly";
        default:
            return interval;
    }
};
