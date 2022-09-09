import { map, action, computed } from "nanostores";

export interface CartItem {
    id: string;
    name: string;
    cover: string;
    price: number;
    quantity: number;
}

export type ItemDisplayInfo = Partial<Pick<CartItem, 'id' | 'name' | 'cover' | 'price'>>;

export type UpdateQuantity = Pick<CartItem, 'id' | 'quantity'>;

export const cartItems = map<Record<string, CartItem>>({});

export const addCartItem = action(cartItems, "addToCart", (store, { id, name, cover, price }: ItemDisplayInfo) => {
    if (id && name && cover && price) {
        const existingEntry = store.get()[id];
        if (existingEntry) {
            store.setKey(id, {
                ...existingEntry,
                quantity: existingEntry.quantity + 1,
            });
        } else {
            store.setKey(id, { id, name, cover, price, quantity: 1 });
        }
    }
});

export const removeCartItem = action(cartItems, "removeToCart", (store, id: string) => {
    const existingEntry = store.get()[id];
    store.setKey(id, {
        ...existingEntry,
        quantity: existingEntry.quantity - 1,
    });
    
    if (store.get()[id].quantity === 0) {
        const { [id]: _, ...otherItems } = store.get();

        store.set(otherItems);
    }
});

export const updateQuantity = action(cartItems, "updateQuantity", (store, { id, quantity }: UpdateQuantity) => {
    const existingEntry = store.get()[id];

    store.setKey(id, {
        ...existingEntry,
        quantity,
    });
});

export const itemsCount = computed(cartItems, items => {
    if (Object.keys(items).length > 0) {
        return Object.values(items).reduce((acc, current) => {
            acc += current.quantity;

            return acc;
        }, 0);
    }

    return 0;
});