export function formatPrice (price?: number, opts = { locale: "fr-FR", currency: "EUR" }) {
    if (price) {
        return new Intl.NumberFormat(opts.locale, { style: "currency", currency: opts.currency }).format(price);
    }
    
    return 0;
};