import type { ReactElement, ReactNode } from "react";
import { useState, useEffect } from "react";

import { isCartOpen, itemsCount } from "@stores/cart";

interface Props {
    children: ReactNode;
};

export function CartButton ({ children }: Props): ReactElement {
    const [nbItems, setNbItems] = useState(itemsCount.get());

    useEffect(() => {
        itemsCount.listen((value) => setNbItems(value));
    }, []);

    return (
        <button className="relative" onClick={onOpen}>
            <>
            {children} <span className="absolute bg-indigo-600 text-white rounded-full py-0 px-1 min-w-fit inline-flex justify-center items-center top-1/2 right-100">{nbItems}</span>
            </>
        </button>
    );

    function onOpen (): void {
        isCartOpen.set(true);
    }
}