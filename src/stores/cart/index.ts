import { onSet } from "nanostores";

import { cartItems, itemsCount, addCartItem, removeCartItem, updateQuantity, CartItem, ItemDisplayInfo } from "@stores/cart/items";
import { getOffers } from "@stores/offer";
import { cartTotal, setTotal } from "@stores/cart/total";
import { isCartOpen } from "@stores/cart/ui";

onSet(cartItems, async ({ newValue }) => {
    const keys = Object.keys(newValue);
    const offers = await getOffers(keys);
    setTotal(offers);
});

export { cartItems, itemsCount, cartTotal, isCartOpen, addCartItem, removeCartItem, updateQuantity };
export type { CartItem, ItemDisplayInfo };