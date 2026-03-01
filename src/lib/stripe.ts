import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        const key = process.env.STRIPE_SECRET_KEY;
        if (!key) {
            throw new Error(
                "STRIPE_SECRET_KEY is not set. Add it to your .env file."
            );
        }
        _stripe = new Stripe(key, {
            apiVersion: "2025-02-24.acacia" as any,
            typescript: true,
        });
    }
    return _stripe;
}

/**
 * @deprecated Use getStripe() instead for lazy initialization.
 * This export is kept for backward compatibility but will throw
 * at import time if STRIPE_SECRET_KEY is missing.
 */
export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        return (getStripe() as any)[prop];
    },
});
