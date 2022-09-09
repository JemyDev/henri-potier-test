import type { ReactElement, ChangeEvent } from "react";
import { useCallback } from "react";

import { CartItem as CartItemValue, addCartItem, removeCartItem, updateQuantity } from "@stores/cart";
import { formatPrice } from "@utils";

interface Props {
    item: CartItemValue;
};

export function CartItem({ item }: Props): ReactElement {
    const setQuantityValue = useCallback((newValue: number) => {
        updateQuantity({ id: item.id, quantity: newValue });
    }, [item.quantity]);

    return (
        <div className="flex gap-3">
            <img className="rounded" width="100px" src={item.cover} alt={item.name} />
            <div className="flex flex-col flex-auto">
                <h3>{item.name}</h3>
                <div className="flex gap-2 align-start justify-start">
                    <button className="text-base text-white w-7 h-7 rounded bg-indigo-600" onClick={onAdd}>+</button>
                    <input onChange={onChange} type="text" name="price" id="price" className="w-10 text-center p-1 rounded-md border border-gray-300 focus:ring-indigo-500 sm:text-sm" value={item.quantity} />
                    <button className="text-base text-white w-7 h-7 rounded bg-indigo-600" onClick={onRemove}>-</button>
                </div>
                <span className="font-bold">{formatPrice(item.price)}</span>
            </div>
        </div>
    );

    function onAdd () {
        addCartItem(item);
    }

    function onRemove () {
        removeCartItem(item.id);
    }

    function onChange (event: ChangeEvent<HTMLInputElement>) {
        setQuantityValue(Number(event.target.value));
    };
};