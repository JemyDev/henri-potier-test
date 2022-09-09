import type { ReactElement } from "react";
import { useMemo } from "react";
import { useStore } from "@nanostores/react";

import { cartTotal } from "@stores/cart";
import { formatPrice } from "@utils";

export function CartTotal (): ReactElement {
    const total = useStore(cartTotal);
    const offerContent = useMemo(() => ([
        {
            type: "minus",
            message: `You just have a special promotion of ${formatPrice(total.discountValue)} less on your total.`,
        },
        {
            type: "percentage",
            message: `You just have a special promotion of ${total.discountValue}% less on your cart.`,
        },
        {
            type: "slice",
            message: `You just have a special promotion of ${formatPrice(total.discountValue)} per slice of ${formatPrice(total.discountSliceValue as number)} less on your total.`
        },
        ]), [total.discountType]);

    return (
        <footer className="border-t border-stone-500 pt-3 mt-4">
            <p className="bg-indigo-600 rounded text-white p-3">{getOfferMessage()}</p>
			<p className="font-bold text-lg mt-2">Total: {formatPrice(total.totalAfterDiscount)}</p>
        </footer>
    );

    function getOfferMessage () {
        return offerContent.find(({ type }) => type === total.discountType)?.message;
    }
}