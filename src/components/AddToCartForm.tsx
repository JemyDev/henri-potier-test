import type { ReactElement, ReactNode, FormEvent } from "react";

import { addCartItem, isCartOpen } from "@stores/cart";
import type { ItemDisplayInfo } from "@stores/cart";

interface Props {
    itemData: ItemDisplayInfo;
    children: ReactNode;
};

export function AddToCartForm({ itemData, children }: Props): ReactElement {
    return (
        <form onSubmit={addToCart}>
            {children}
        </form>
    );

    function addToCart(e: FormEvent) {
        e.preventDefault();
        isCartOpen.set(true);
        addCartItem(itemData);
    }
};