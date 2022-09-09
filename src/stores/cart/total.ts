import { atom, action, computed } from "nanostores";
import type { CommercialOffers, Offer } from "@schemas/CommercialOffer.type";
import { cartItems } from "@stores/cart/items";

export interface CartTotal {
    discountType: Offer | null;
    discountValue: number;
    discountSliceValue?: number;
    totalAfterDiscount: number;
};

export const cartTotal = atom<CartTotal>({
    discountType: null,
    discountValue: 0,
    totalAfterDiscount: 0,
    discountSliceValue: 0,
});

export const totalPrice = computed(cartItems, items => {
    if (Object.keys(items).length > 0) {
        return Object.values(items).reduce((acc, current) => {
            acc += current.price * current.quantity;

            return acc;
        }, 0);
    }

    return 0;
});

export const setTotal = action(cartTotal, "setTotal", (store, { offers }: CommercialOffers) => {
    const totalArray = offers.reduce<CartTotal[]>((acc, offer) => {
        if (offer.type === "percentage") {
            acc.push({
                discountType: offer.type,
                discountValue: offer.value,
                totalAfterDiscount: totalPrice.get() - (totalPrice.get() * (offer.value / 100))
            });
        }
        if (offer.type === "minus") {
            acc.push({
                discountType: offer.type,
                discountValue: offer.value,
                totalAfterDiscount: totalPrice.get() - offer.value,
            });
        }
        if (offer.type === "slice" && offer.sliceValue) {
            const slices = Math.floor(totalPrice.get() / offer.sliceValue);
            acc.push({
                discountType: offer.type,
                discountValue: offer.value,
                discountSliceValue: offer.sliceValue,
                totalAfterDiscount: totalPrice.get() - (slices * offer.value),
            });
        }

        return acc;
    }, []);

    const [smallest, ...otherOffers] = totalArray.sort((a, b) => a.totalAfterDiscount - b.totalAfterDiscount);

    store.set(smallest);
});
